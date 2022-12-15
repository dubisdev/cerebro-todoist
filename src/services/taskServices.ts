import { notification } from "../components";
import type { TodoistApi, Task } from "@doist/todoist-api-typescript";

import { getSubCommandText } from "cerebro-command-router";
import lang from "../lang";
import { quickAdd } from "./quickAdd";

export async function createTask(token: string, { text = "" } = {}) {
  let taskText = getSubCommandText(text);

  try {
    await quickAdd(taskText, token);
    notification({ body: lang.notifications.taskCreated });
  } catch (err) {
    if (!err.status)
      notification({ body: lang.notifications.createTaskErrorInternet });
    else if (err.status === 403)
      notification({ body: lang.notifications.createTaskErrorToken });
  }
}

export const getTaskHour = (task: Task) => {
  if (task?.due?.datetime) {
    const hour = new Date(task.due.datetime)
      .toTimeString()
      .split(" ")[0]
      .slice(0, 5);
    return "⌛ " + hour;
  } else return;
};

export const completeTask = async (Client: TodoistApi, task: Task) => {
  if (!task) return;
  await Client.closeTask(task.id);
  notification({ body: lang.notifications.taskCompleted });
};

export const deleteTask = async (Client: TodoistApi, task: Task) => {
  if (!task) return;
  await Client.deleteTask(task.id);
  notification({ body: lang.notifications.taskDeleted });
};
