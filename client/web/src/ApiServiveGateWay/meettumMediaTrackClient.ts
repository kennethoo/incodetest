import * as mediasoupClient from "mediasoup-client";
import generateUUID from "utility/generateUUID";
import socketMediaServer from "mediaServerConfig";

export class MeettumMediaProducerClient {
  device: any;
  socket: any;
  sendTransport: null | any;
  rtpCapabilities: null | any;
  producerTransport: any;
  producer: any;
  params: {
    encoding: { rid: string; maxBitrate: number; scalabilityMode: string }[];
    codecOptions: { videoGoogleStartBitrate: number };
  };
  isProcessing: boolean;
  isAudioProcessing: boolean;
  isVideoProcessing: boolean;
  isScreenProcessing: boolean;
  isVideoTrackPublished: boolean;
  isAudioTrackPublished: boolean;
  broadcasterId: null | string;
  producerId: string;
  currentlyProducingMediaTrack: string;

  videoProducer: null | any;
  audioProducer: null | any;
  videoScreenProducer: null | any;
  audio: string;
  video: string;
  screenVideo: string;
  screenVideoProducerId: string;
  audioProducerId: string;
  videoProducerId: string;
  roomId: string;

  constructor() {
    //instance
    this.device = new mediasoupClient.Device();
    this.socket = socketMediaServer;

    // client enum
    this.audio = "audio";
    this.video = "video";
    this.screenVideo = "screenVideo";

    this.roomId = "";
    this.broadcasterId = null;
    this.screenVideoProducerId = "";
    this.audioProducerId = "";
    this.videoProducerId = "";
    this.isVideoTrackPublished = false;
    this.isAudioTrackPublished = false;
    this.currentlyProducingMediaTrack = "";
    this.isProcessing = false;
    this.isAudioProcessing = false;
    this.isVideoProcessing = false;

    this.sendTransport = null;
    this.rtpCapabilities = null;
    this.producerTransport = null;
    this.audioProducer = null;
    this.videoProducer = null;
    this.videoScreenProducer = null;

    this.params = {
      encoding: [
        { rid: "r0", maxBitrate: 100000, scalabilityMode: "S1T3" },
        { rid: "r1", maxBitrate: 300000, scalabilityMode: "S1T3" },
        { rid: "r2", maxBitrate: 900000, scalabilityMode: "S1T3" },
      ],
      codecOptions: {
        videoGoogleStartBitrate: 1000,
      },
    };
  }

  async loadDevice(routerRtpCapabilities) {
    if (!this.device.loaded) {
      await this.device.load({ routerRtpCapabilities });
    }
  }

  // Method to create send transport
  async createSendTransport() {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "createWebRtcTransport",
        {
          sender: true,
          broadcasterId: this.broadcasterId,
        },
        ({ params }) => {
          if (params.error) {
            reject(params.error);
            return;
          }
          this.producerTransport = this.device.createSendTransport(params);
          resolve("ok");

          this.producerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await this.socket.emit("producer-transport-connect", {
                  broadcasterId: this.broadcasterId,
                  dtlsParameters,
                });
                callback();
              } catch (error) {
                errback(error);
              }
            },
          );
          ///// after connect ,noew produce will stat
          this.producerTransport.on("produce", async (parameters, callback) => {
            try {
              await this.socket.emit(
                "producer-transport-produce",
                {
                  broadcasterId: this.broadcasterId,
                  kind: parameters.kind,
                  rtpParameters: parameters.rtpParameters,
                  appData: parameters.appData,
                  meettumTrackKind: this.currentlyProducingMediaTrack,
                },
                ({ id }) => {
                  this.saveProducerId(id);
                  callback({ id });
                },
              );
            } catch (error) {}
          });
        },
      );
      return this.sendTransport;
    });
  }

  // Method to create receive transport
  async saveProducerId(id) {
    this.producerId = id;
    if (this.currentlyProducingMediaTrack === this.audio) {
      this.audioProducerId = id;
    } else if (this.currentlyProducingMediaTrack === this.video) {
      this.videoProducerId = id;
    } else if (this.currentlyProducingMediaTrack === this.screenVideo) {
      this.screenVideoProducerId = id;
    }
  }
  async getRtpCapability() {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "getRtpCapabilities",

        (data) => {
          this.rtpCapabilities = data.rtpCapabilities;
          resolve(data.rtpCapabilities);
        },
      );
    });
  }

  // the function will allow us to send a media transport
  async connectSendTransport(track) {
    //now this action triger "conect and produce for the producer event"
    this.producer = await this.producerTransport.produce({
      ...this.params,
      track,
    });
  }

  async initServer({ uniqueId, roomId }: { uniqueId: string; roomId: string }) {
    if (this.isProcessing) {
      return { succeeded: false, errorMessage: "is isProcessing " };
    }
    this.isProcessing = true;
    this.socket.auth = {
      broadcasterId: uniqueId,
      roomId,
    };
    await this.socket.connect();
    this.broadcasterId = uniqueId;
    this.roomId = roomId;

    /// when a user is about the join a room or event we have 2 type of people
    //1 the producer (AKA me) and the consumer (AKA Bob)
    //now before a can start sending my or reciving stream i first need to get my router  RtpCapability

    //Step one
    const rtpCapabilities = await this.getRtpCapability();
    //step two now is  to load my device based on the router  rtpCapabilities

    await this.loadDevice(rtpCapabilities);
    //step thrw now is to create an send transport.
    // now this step is really important bacause it establish the connect between me and the server when i want to send a track
    //we need to pass the broadcasterId and the roomId

    await this.createSendTransport();
    this.isProcessing = false;
    //next we have a coupole of optio

    //send the a mediaTrack ?  with
    //we can this.connectSendTransport()
    // this will help up send a media tack (audio or video
  }

  async produceVideoTrack(videoStream) {
    try {
      if (this.isVideoProcessing) {
        return { succeeded: false, errorMessage: "" };
      }
      this.isVideoProcessing = true;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      videoStream.current = stream;
      const track = await stream.getVideoTracks()[0];
      if (!track) {
        this.isVideoProcessing = false;
        return { succeeded: false, errorMessage: "No video track available" };
      }

      // This client handle producer camera video track
      this.currentlyProducingMediaTrack = this.video;
      this.videoProducer = await this.producerTransport.produce({
        ...this.params,
        track,
      });
      this.isVideoTrackPublished = true;
      this.isVideoProcessing = false;
      return { succeeded: true, stream };
    } catch (error) {
      return { succeeded: false, errorMessage: error.message };
    }
  }

  async produceAudioTrack(audioStream) {
    try {
      // This client handle producer camera video track
      if (this.isAudioProcessing) {
        return { succeeded: false, errorMessage: "no yet audio is processing" };
      }

      this.isAudioProcessing = true;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      audioStream.current = stream;
      const track = await stream.getAudioTracks()[0];
      if (!track) {
        console.error("No video track available");
        return;
      }
      this.currentlyProducingMediaTrack = this.audio;
      this.audioProducer = await this.producerTransport.produce({
        ...this.params,
        track,
      });
      this.isAudioTrackPublished = true;
      this.isAudioProcessing = false;

      return { succeeded: true, stream };
    } catch (error) {
      return { succeeded: false, errorMessage: error.message };
    }
  }

  async produceVideoScreenTrack(screenShareRef) {
    // This client handle producer video screen video track, with not audio
    try {
      if (this.isProcessing) {
        return { succeeded: false, errorMessage: "" };
      }
      this.isProcessing = true;
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      screenShareRef.current = stream;
      const track = await stream.getVideoTracks()[0];
      if (!track) {
        console.error("No video track available");
        return { succeeded: false, errorMessage: "No video track available" };
      }
      this.currentlyProducingMediaTrack = this.screenVideo;
      this.videoScreenProducer = await this.producerTransport.produce({
        ...this.params,
        track,
      });
      this.isProcessing = false;
      return { succeeded: true };
    } catch (error) {
      this.isProcessing = false;
      if (error.message === "Permission denied") {
        return { succeeded: false, errorMessage: "" };
      } else {
        return { succeeded: false, errorMessage: error.message };
      }
    }
  }

  async pauseMediaTrack({ kind }) {
    if (this.isProcessing) {
      return { succeeded: false, errorMessage: "" };
    }
    this.isProcessing = true;
    const producerId =
      kind === this.audio ? this.audioProducerId : this.videoProducerId;
    return new Promise((resolve, reject) => {
      this.socket.emit("pause-video-producer", { producerId }, ({ params }) => {
        if (params.error) {
          reject(params.error);
          return;
        }
        this.isProcessing = false;
        resolve({ succeeded: true, message: "track was puase" });
      });
    });
  }

  async resumeMediaTrack({ kind }) {
    if (this.isProcessing) {
      return { succeeded: false, errorMessage: "" };
    }
    this.isProcessing = true;
    const producerId =
      kind === this.audio ? this.audioProducerId : this.videoProducerId;
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "resume-video-producer",
        { producerId },
        ({ params }) => {
          if (params.error) {
            reject(params.error);
            return;
          }
          this.isProcessing = false;
          resolve({ succeeded: true, message: "media was resume" });
        },
      );
    });
  }

  async closeProducerId({ producerId, kind }) {
    this.socket.emit("close-producer", {
      producerId,
      kind,
      broadcasterId: this.broadcasterId,
    });
  }

  async stopSharingScreen() {
    if (!this.videoScreenProducer) return;
    this.videoScreenProducer = null;
    this.closeProducerId({
      producerId: this.screenVideoProducerId,
      kind: this.screenVideo,
    });
  }

  async stopAudio() {
    if (!this.audioProducer) return;
    this.audioProducer = null;
    this.closeProducerId({
      producerId: this.audioProducerId,
      kind: this.audio,
    });
  }

  async stopVideo() {
    if (!this.videoProducer) return;
    this.videoProducer = null;
    this.closeProducerId({
      producerId: this.videoProducerId,
      kind: this.video,
    });
  }

  async close() {
    this.producerTransport?.close();
    this.videoProducer?.close();
    this.audioProducer?.close();
    this.videoScreenProducer?.close();
    this.socket.disconnect();
  }
}

export class MeettumMediaConsumerClient {
  device: mediasoupClient.types.Device;
  socket: any;
  sendTransport: null;
  rtpCapabilities: null;
  producerTransport: null;
  producer: null;
  consumerTransport: null | any;
  broadcasterId: null;
  consumer: any;
  consumerId: String;
  audio: string;
  video: string;
  screenVideo: string;
  isVideoTrackConsume: boolean;
  isAudioTrackConsumer: boolean;
  audioConsumerId: string;
  videoConsumerId: string;
  audioConsumer: null | any;
  videoConsumer: null | any;
  videoScreenConsumer: null | any;
  videoScreenConsumerId: string;
  consumerTransportId: unknown;
  roomId: any;
  constructor() {
    this.device = new mediasoupClient.Device();
    this.socket = socketMediaServer;

    this.audio = "audio";
    this.video = "video";
    this.screenVideo = "screenVideo";

    this.roomId = "";
    this.audioConsumerId = "";
    this.videoConsumerId = "";
    this.videoScreenConsumerId = "";
    this.isVideoTrackConsume = false;
    this.isAudioTrackConsumer = false;

    this.sendTransport = null;
    this.rtpCapabilities = null;
    this.producerTransport = null;
    this.producer = null;
    this.consumerTransport = null;
    this.broadcasterId = null;
    this.consumer = {};

    this.audioConsumer = null;
    this.videoConsumer = null;
    this.videoScreenConsumer = null;
  }

  async getRtpCapability() {
    return new Promise((resolve, reject) => {
      this.socket.emit("getRtpCapabilities", (data) => {
        this.rtpCapabilities = data.rtpCapabilities;
        resolve(data.rtpCapabilities);
      });
    });
  }

  async loadDevice(routerRtpCapabilities) {
    if (!this.device.loaded) {
      await this.device.load({ routerRtpCapabilities });
    }
  }

  async createRecvTransport() {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "createWebRtcTransport",
        {
          sender: false,
          broadcasterId: this.broadcasterId,
          consumerTransportId: this.consumerTransportId,
        },
        ({ params }) => {
          if (params.error) {
            reject(params.error);
            return;
          }

          this.consumerTransport = this.device.createRecvTransport(params);
          resolve("ok");
          this.consumerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await this.socket.emit("transport-recv-connect", {
                  consumerTransportId: this.consumerTransportId,
                  dtlsParameters,
                });
                callback();
              } catch (error) {
                errback(error);
              }
            },
          );
        },
      );
    });
  }

  async connectRecvTransport({ kind }) {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "consume-user-media-track",
        {
          rtpCapabilities: this.rtpCapabilities,
          broadcasterId: this.broadcasterId,
          consumerTransportId: this.consumerTransportId,
          kind,
        },
        async ({ params }) => {
          if (params.error) {
            reject(params.error);
            return;
          }

          resolve(params);
        },
      );
    });
  }

  async getUserVideoTrack() {
    if (this.isVideoTrackConsume) {
      return null;
    }
    const params: any = await this.connectRecvTransport({ kind: this.video });
    this.videoConsumer = await this.consumerTransport.consume({
      id: params.id,
      producerId: params.producerId,
      kind: params.kind,
      rtpParameters: params.rtpParameters,
    });
    this.videoConsumerId = params.id;
    const { track } = this.videoConsumer;
    const mediaStream = new MediaStream([track]);
    this.socket.emit("consumer-resume", {
      consumerId: this.videoConsumerId,
    });
    return mediaStream;
  }

  async getUserAudioTrack() {
    const params: any = await this.connectRecvTransport({ kind: this.audio });
    this.audioConsumer = await this.consumerTransport.consume({
      id: params.id,
      producerId: params.producerId,
      kind: params.kind,
      rtpParameters: params.rtpParameters,
    });
    this.audioConsumerId = params.id;
    const { track } = this.audioConsumer;

    const mediaStream = new MediaStream([track]);
    this.socket.emit("consumer-resume", {
      consumerId: this.audioConsumerId,
    });

    return mediaStream;
  }

  async getScreenVideoTrack() {
    const params: any = await this.connectRecvTransport({
      kind: this.screenVideo,
    });
    this.videoScreenConsumer = await this.consumerTransport?.consume({
      id: params.id,
      producerId: params.producerId,
      kind: params.kind,
      rtpParameters: params.rtpParameters,
    });
    this.videoScreenConsumerId = params.id;
    const { track } = this.videoScreenConsumer;
    const mediaStream = new MediaStream([track]);
    this.socket.emit("consumer-resume", {
      consumerId: this.videoScreenConsumerId,
    });
    return mediaStream;
  }

  async initialServer({ broadcasterId, roomId }) {
    const consumerTransportId = await generateUUID();
    this.broadcasterId = broadcasterId;
    this.roomId = roomId;
    this.consumerTransportId = consumerTransportId;
    const rtpCapabilities = await this.getRtpCapability();
    await this.loadDevice(rtpCapabilities);
    await this.createRecvTransport();
  }

  async closeComsumerScreenTrack() {
    this.close();
  }

  async close() {
    // destroy the consumer transport and all consumer instance
    this.consumerTransport?.close();
    this.audioConsumer?.close();
    this.videoConsumer?.close();

    this.socket.emit("close-consumer-instance", {
      consumerTransportId: this.consumerTransportId,
      broadcasterId: this.broadcasterId,
    });
    //destroy the video ,audio and screen media track
  }

  async closeConsumerId({ producerId, kind }) {
    this.socket.emit("close-consumer", {
      producerId,
      kind,
      broadcasterId: this.broadcasterId,
    });
  }
}
