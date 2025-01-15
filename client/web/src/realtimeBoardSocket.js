import { io } from "socket.io-client";
import apiUrl from "apiUrl/url";
const realtimeBoardSocket = io(apiUrl.network, {
  transports: ["websocket"],
  upgrade: false,
  autoConnect: false,
});
export default realtimeBoardSocket;
