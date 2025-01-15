const iceServers = {
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:standard.relay.metered.ca:80",
      username: "d4c82dc4c4ac285d1e2596f0",
      credential: "AjWWZEY8u7cmKgr1",
    },
    {
      urls: "turn:standard.relay.metered.ca:80?transport=tcp",
      username: "d4c82dc4c4ac285d1e2596f0",
      credential: "AjWWZEY8u7cmKgr1",
    },
    {
      urls: "turn:standard.relay.metered.ca:443",
      username: "d4c82dc4c4ac285d1e2596f0",
      credential: "AjWWZEY8u7cmKgr1",
    },
    {
      urls: "turns:standard.relay.metered.ca:443?transport=tcp",
      username: "d4c82dc4c4ac285d1e2596f0",
      credential: "AjWWZEY8u7cmKgr1",
    },
  ],
};
export default iceServers;
