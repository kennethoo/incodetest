import * as mediasoupClient from "mediasoup-client";

class MediaSoupService {
  device: any;
  socket: any;
  constructor(socket: any) {
    this.device = new mediasoupClient.Device();
    this.socket = socket; // Socket.io client instance
  }

  async loadDevice(routerRtpCapabilities) {
    if (!this.device.loaded) {
      await this.device.load({ routerRtpCapabilities });
    }
  }

  // Method to create send transport
  async createSendTransport(transportOptions) {
    return this.device.createSendTransport(transportOptions);
  }

  // Method to create receive transport
  async createRecvTransport(transportOptions) {
    return this.device.createRecvTransport(transportOptions);
  }

  // Additional methods to produce/consume media, connect transports, etc.
}

export default MediaSoupService;
