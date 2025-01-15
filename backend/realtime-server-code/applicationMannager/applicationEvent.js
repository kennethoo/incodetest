class ApplicationEvent {
  constructor() {
    this.meetingSessionCreated = "meetingSessionCreated";
    this.meetingSessionRemove = "meetingSessionRemove";
    this.taskRemove = "taskRemove";
    this.taskCreated = "taskCreated";
    this.invitationReceive = "invitationReceive";
    this.newMessageCreated = "newMessageCreated";
    this.incomingCall = "incomingCall";
  }
}

const applicationEventApi = new ApplicationEvent();
module.exports = { applicationEventApi };
