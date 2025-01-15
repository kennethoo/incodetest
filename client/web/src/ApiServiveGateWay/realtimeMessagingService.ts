export class RealTimeMessageService {
  socket?: null | any;
  constructor() {
    this.socket = null;
  }
  subscribe = (socket, handleNewMessage) => {
    this.socket = socket;
    this.socket.on("newprivate:message:event", (data) => {
      handleNewMessage(data);
    });
  };
  unsubscribe = () => {
    this.socket.off("newprivate:message:event");
  };
}

export const realTimeMessageService = new RealTimeMessageService();
