import store from "store/store";
import filterDuplicateObjects from "utility/filterDuplicateObjects";

const rootReducer = (state = store, action) => {
  let { type, value } = action || {};
  switch (type) {
    case "UPDATE_USER":
      return { ...state, user: value };

    case "UPDATE_REPORT":
      return {
        ...state,
        report: value,
      };

    case "UPDATE_USERNAME":
      return {
        ...state,
        usernameLists: value,
      };
    case "UPDATE_ICON":
      return {
        ...state,
        iconList: value,
      };

    case "OPEN_DELETE_POST_MODAL":
      return {
        ...state,
        deletePost: value,
      };
    case "UPDATE_FEED":
      return {
        ...state,
        userFeeds: value,
      };
    case "UPDATE_COMMENT":
      return {
        ...state,
        comments: value,
      };
    case "UPDATE_CREATE_MEETING":
      return {
        ...state,
        openMeetingModal: value,
      };
    case "UPDATE_METTING_SESSIONS":
      return {
        ...state,
        meetingSessions: value,
      };
    case "UPDATE_METTING_DEFAULT_TIME":
      return {
        ...state,
        selectedTimeAndDate: value,
      };
    case "UPDATE_USER_LOGIN_STATUS":
      return {
        ...state,
        userLoginStatus: value,
      };
    case "UPDATE_MEETING":
      return {
        ...state,
        meetings: value,
      };
    case "UPDATE_APPLICATION_LOGGER":
      return {
        ...state,
        isErrorMessage: value.isErrorMessage,
        messageToLog: value.messageToLog,
      };
    case "UPDATE_APPLICATION_NEW_MESSAGE_NOTIFICATION":
      return {
        ...state,
        messageToNotify: value.messageToNotify,
        isMessageNotifyOpen: value.isMessageNotifyOpen,
      };
    case "UPDATE_MODAL_VALUE":
      return {
        ...state,
        modalId: value.modalId,
        modalValue: value.modalValue,
      };
    case "ADD_UPCOMING_MEETING_SESSION_TO_LIST":
      return {
        ...state,
        activeSessions: filterDuplicateObjects([
          ...state.activeSessions,
          ...value,
        ]),
      };

    case "REMOVE_UPCOMING_MEETING_SESSION_FROM_LIST":
      const newMeetingSessionList = state.activeSessions.filter(
        ({ _id }) => _id !== value,
      );
      return {
        ...state,
        activeSessions: [...newMeetingSessionList],
      };

    case "UPDATE_RECENT_PROJECT_LIST":
      return {
        ...state,
        recentProject: filterDuplicateObjects([
          ...state.recentProject,
          ...value,
        ]),
      };

    case "ADD_UPCOMING_TASK_TO_LIST":
      return {
        ...state,
        upComingTasks: filterDuplicateObjects([
          ...state.upComingTasks,
          ...value,
        ]),
      };

    case "REMOVE_UPCOMING_TASK_FROM_LIST":
      const newTaskList = state.upComingTasks.filter(
        ({ _id }) => _id !== value,
      );
      return {
        ...state,
        upComingTasks: [...newTaskList],
      };
    case "UPDATE_MODE":
      return {
        ...state,
        mode: value,
      };
    case "UPDATE_MEETTUM_LINKS":
      return {
        ...state,
        meettumLinks: value,
      };
    case "UPDATE_CONFETTI":
      return {
        ...state,
        isConfetti: value,
      };
    case "UPDATE_CALENDAR":
      return {
        ...state,
        calendar: filterDuplicateObjects([...state.calendar, ...value]),
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        listOfContact: value,
      };
    case "UPDATE_INVITATION_LIST":
      return {
        ...state,
        listOfInvitation: value,
      };
    case "UPDATE_MISSED_MESSAGE_COUNT":
      const count = state.missedMessageCount[value.spaceId] ?? 0;
      const newUpdate = { ...state.missedMessageCount };

      if (value.action === "inc") {
        newUpdate[value.spaceId] = count + 1;
      } else if (value.action === "dec") {
        newUpdate[value.spaceId] = count - 1;
      } else if (value.action === "reset") {
        newUpdate[value.spaceId] = 0;
      } else if (value.action === "add") {
        newUpdate[value.spaceId] = value.initValue;
      }
      return {
        ...state,
        missedMessageCount: newUpdate,
      };
    case "UPDATE_CONVERSATION_LIST":
      return {
        ...state,
        listOfConversations: filterDuplicateObjects([
          ...state.listOfConversations,
          ...value,
        ]),
      };

    case "SORT_CONVERSATION_LIST":
      const tempChat = [...state.listOfConversations];
      const index = tempChat.findIndex((chat) => chat.channelId === value);
      if (index) {
        const chat = tempChat[index];
        tempChat.splice(index, 1);
        tempChat.unshift(chat);
        const ids = tempChat.map((item) => item.channelId);
        localStorage.setItem("listofchat", JSON.stringify(ids));
      }
      return {
        ...state,
        listOfConversations: [...tempChat],
      };
    default:
      return state;
  }
};
export default rootReducer;
