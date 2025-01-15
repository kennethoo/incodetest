const webRtcC = {
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:a.relay.metered.ca:80",
      username: "03ad1424da36d83e479558bd",
      credential: "TyCvc/ZimfvGmeI7",
    },
    {
      urls: "turn:a.relay.metered.ca:80?transport=tcp",
      username: "03ad1424da36d83e479558bd",
      credential: "TyCvc/ZimfvGmeI7",
    },
    {
      urls: "turn:a.relay.metered.ca:443",
      username: "03ad1424da36d83e479558bd",
      credential: "TyCvc/ZimfvGmeI7",
    },
    {
      urls: "turn:a.relay.metered.ca:443?transport=tcp",
      username: "03ad1424da36d83e479558bd",
      credential: "TyCvc/ZimfvGmeI7",
    },
  ],
};
export default webRtcC;

// iceServers: [
//   {
//     url: 'stun:global.stun.twilio.com:3478',
//     urls: 'stun:global.stun.twilio.com:3478',
//   },
//   {
//     url: 'turn:global.turn.twilio.com:3478?transport=udp',
//     username:
//       'd88e4f1c6abd319b6d4e9792b1574b8300b3fc7f388648e7d4ae325c270619ba',
//     urls: 'turn:global.turn.twilio.com:3478?transport=udp',
//     credential: 'zb5BmoW3ykX9E5aKxaAC+VVnnFQyFJVhuHynqyKVYwU=',
//   },
//   {
//     url: 'turn:global.turn.twilio.com:3478?transport=tcp',
//     username:
//       'd88e4f1c6abd319b6d4e9792b1574b8300b3fc7f388648e7d4ae325c270619ba',
//     urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
//     credential: 'zb5BmoW3ykX9E5aKxaAC+VVnnFQyFJVhuHynqyKVYwU=',
//   },
//   {
//     url: 'turn:global.turn.twilio.com:443?transport=tcp',
//     username:
//       'd88e4f1c6abd319b6d4e9792b1574b8300b3fc7f388648e7d4ae325c270619ba',
//     urls: 'turn:global.turn.twilio.com:443?transport=tcp',
//     credential: 'zb5BmoW3ykX9E5aKxaAC+VVnnFQyFJVhuHynqyKVYwU=',
//   },
// ],
