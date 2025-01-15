interface store {
  user: null;
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
const store = {
  user: null,
  openMeetingModal: false as boolean,
  peopleRecent: [] as any[], // Replace `any` with the appropriate type for your recent people data
  inbox: [] as any[], // Replace `any` with the appropriate type for your inbox data
  usernameLists: [] as any[], // Replace `any` with the appropriate type for your username list data
  iconList: {},
  postList: [] as any[], // Replace `any` with the appropriate type for your post list data
  followLists: [] as any[], // Replace `any` with the appropriate type for your follow list data
  userFeeds: null,
  comments: [] as any[], // Replace `any` with the appropriate type for your comments data
  searchBox: [] as any[], // Replace `any` with the appropriate type for your search box data
  meetingSessions: [],
  meetings: [],
  taskRemminderList: [],
  defaultStartTime: "09:00",
  defaultEndTime: "09:30",
  userLoginStatus: "checking",
  isErrorMessage: true,
  messageToLog: "",
  modalId: null,
  modalValue: null,
  activeSessions: [],
  mode: "",
  selectedTimeAndDate: {
    startTime: "09:00",
    endTime: "09:30",
    date: "",
  },
  meettumLinks: [],
  upComingTasks: [],
  calendar: [],
  recentProject: [],
  isConfetti: false,
  listOfContact: [],
  listOfInvitation: [],
  messageToNotify: null,
  isMessageNotifyOpen: false,
  missedMessageCount: {},
  listOfConversations: [],
};

export default store;
