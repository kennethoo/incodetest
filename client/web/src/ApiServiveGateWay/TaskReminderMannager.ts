import meettumApi from "ApiServiveGateWay/apiConfig";
class TaskReminderMannager {
  CONFIRM: string;
  ENDED: string;
  INSTANT: string;
  STANDALONE: string;
  UNCONFIRM: string;
  COMPLETED: string;
  BELONGTOAMEETINGMANAGER: string;
  UNCOMPLETED: string;
  constructor() {
    this.INSTANT = "instant";
    this.ENDED = "ended";
    this.COMPLETED = "completed";
    this.UNCOMPLETED = "uncompleted";
  }
  createtaskReminder = async (taskDetails) => {
    const result = await meettumApi.post("/api/v1/createtask", taskDetails);
    return result.data;
  };

  getTaskReminderFromDate = async (query) => {
    const { data } = await meettumApi.get(
      `/api/v1/taskReminder/${JSON.stringify(query)}`,
    );
    return { data };
  };

  getTaskReminder = async (taskReminderId) => {
    const query = JSON.stringify({ taskReminderId });
    const { data } = await meettumApi.get(`/api/v1/taskReminder/${query}`);

    return { data };
  };

  getAllTaskReminder = async (query) => {
    const { data } = await meettumApi.get(
      `/api/v1/taskReminder/${JSON.stringify({
        ...query,
      })}`,
    );
    return { data };
  };
  updateTaskState = async (payload) => {
    const { data } = await meettumApi.post(
      "/api/v1/taskReminder/update",
      payload,
    );
    return data;
  };
}
const taskReminderMannager = new TaskReminderMannager();
export default taskReminderMannager;
