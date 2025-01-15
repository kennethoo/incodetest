import { io } from "socket.io-client";
import apiUrl from "apiUrl/url";
const socket = io(apiUrl.mediaServer, {
  transports: ["websocket"],
  upgrade: false,
  autoConnect: false,
});
export default socket;
