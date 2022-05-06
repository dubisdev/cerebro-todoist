import { notification } from "../components";
import { TDSClient, APITaskObject } from "todoist-rest-client/dist/definitions";

import { getSubCommandText } from "cerebro-command-router";
import lang from "../lang";
import { quickAdd } from "./quickAdd";

export async function createTask(Client: TDSClient, { text = "" } = {}) {
  let taskText = getSubCommandText(text);

  try {
    await quickAdd(taskText, Client.apiToken);
    notification({ body: lang.notifications.taskCreated });
  } catch (err) {
    if (!err.response)
      notification({ body: lang.notifications.createTaskErrorInternet });
    else if (err.response.status === 403)
      notification({ body: lang.notifications.createTaskErrorToken });
  }
}

export const getTaskHour = (task: APITaskObject) => {
  if (!task.due.datetime) return;

  const hour = new Date(task.due.datetime)
    .toTimeString()
    .split(" ")[0]
    .slice(0, 5);
  return "⌛ " + hour;
};

export const completeTask = async (Client: TDSClient, task: APITaskObject) => {
  if (!task) return;
  await Client.task.close(task.id);
  notification({ body: lang.notifications.taskCompleted });
};

export const deleteTask = async (Client: TDSClient, task: APITaskObject) => {
  if (!task) return;
  await Client.task.delete(task.id);
  notification({ body: lang.notifications.taskDeleted });
};
