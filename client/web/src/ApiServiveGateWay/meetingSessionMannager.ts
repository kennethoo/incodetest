import meettumApi from "ApiServiveGateWay/apiConfig";
interface updateParticipantStateProps {
  meetingSessionId: string;
  userId: string;
  username?: string;
  note?: string;
  status: string;
}
class MeetingSessionMannager {
  meetingId: any;
  CONFIRM: string;
  ENDED: string;
  INSTANT: string;
  STANDALONE: string;
  UNCONFIRM: string;
  BELONGTOAMEETINGMANAGER: string;
  DEFAULT_INSTANT_MEETING_DURATION: number;
  CANCELLED: string;
  DECLINED: string;
  STANDALONE_EVENT: string;
  MEETTUMEVENT: string;
  STARTED: string;
  NOTSTARTED: string;
  constructor({ meetingId }) {
    this.meetingId = meetingId;
    this.INSTANT = "instant";
    this.CONFIRM = "confirm";
    this.ENDED = "ended";
    this.STANDALONE = "standalone";
    this.UNCONFIRM = "unconfirm";
    this.DECLINED = "declined";
    this.CANCELLED = "cancelled";
    this.BELONGTOAMEETINGMANAGER = "belongtomeetingmannager";
    this.DEFAULT_INSTANT_MEETING_DURATION = 30;
    this.STANDALONE_EVENT = "standaloneevent";
    this.MEETTUMEVENT = "meettumevent";
    this.STARTED = "started";
    this.NOTSTARTED = "notstarted";
  }
  createMeetingSession = async (meetingDetails) => {
    const result = await meettumApi.post(
      "/api/v1/book/meeting",
      meetingDetails,
    );
    return result.data;
  };

  updateParticipantState = async ({
    meetingSessionId,
    userId,
    username,
    status,
    note,
  }: updateParticipantStateProps) => {
    const result = await meettumApi.post("/api/v1/updateParticipantState", {
      username,
      meetingSessionId,
      userId,
      status,
      note,
    });
    return result.data;
  };

  inviteUserInMeetingSession = async ({
    meetingSessionId,
    email,
    username,
  }) => {
    const result = await meettumApi.post("/api/v1/inviteuserinmeetingsession", {
      meetingSessionId,
      email,
      username,
    });
    return result.data;
  };

  updateMesstionOfTypeEventDetails = async (payload) => {
    const result = await meettumApi.post(
      "/api/v1/meeting/session/event/update",
      payload,
    );
    return result.data;
  };

  updateMesstionOfTypePreviewImage = async (payload) => {
    const result = await meettumApi.post(
      "/api/v1/meeting/session/event/previewUrl/update",
      payload,
    );
    return result.data;
  };

  checkParticpantStatus = async (payload) => {
    const query = JSON.stringify(payload);
    const result = await meettumApi.get(
      `/api/v1/event/session/check/participant/${query}`,
    );
    return result.data;
  };

  getUpCommingEvent = async () => {
    const result = await meettumApi.get(`/api/v1/event/session/myevent`);
    return result.data;
  };

  getMeetingSessions = async (query) => {
    const stringify = await JSON.stringify(query);
    const { data } = await meettumApi.get(
      `/api/v1/meeting/session/${stringify}`,
    );
    return { data };
  };
  transitionEventSessionState = async (payload) => {
    const { data } = await meettumApi.post(
      `/api/v1/event/session/transition/state`,
      payload,
    );
    return { data };
  };

  transitionEventSessionSubState = async (payload) => {
    const { data } = await meettumApi.post(
      `/api/v1/event/session/transition/sub/state`,
      payload,
    );
    return { data };
  };

  getEventParticipant = async (filter) => {
    const { data } = await meettumApi.get(
      `/api/v1/event/session/partipant/info/${JSON.stringify(filter)}`,
      filter,
    );
    return { data };
  };
}
const meetingSessionMannagerApi = new MeetingSessionMannager({
  meetingId: null,
});
export { MeetingSessionMannager, meetingSessionMannagerApi };
