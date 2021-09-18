import { notification } from "../components";
import { Task } from "todoist-rest-client";
import { getTaskPriority, getTaskDescription } from "./textUtilities.js";
import { getSubCommandText } from "cerebro-command-router";
import lang from "../lang";

export function createTask(Client, { text = "" } = {}) {
	let rudeText = getSubCommandText(text);
	const [description, taskTextWODescription] = getTaskDescription(rudeText);
	const [priority, taskText] = getTaskPriority(taskTextWODescription);

	return Client.task
		.create(
			new Task({
				content: taskText,
				due_string: lang.taskServices.due_string,
				due_lang: lang.taskServices.due_lang,
				priority,
				description,
			})
		)
		.then(() => {
			notification({ body: lang.notifications.taskCreated });
		})
		.catch((err) => {
			if (!err.response)
				notification({ body: lang.notifications.createTaskErrorInternet });
			else if (err.response.status === 403)
				notification({ body: lang.notifications.createTaskErrorToken });
		});
}

export const getTaskHour = (task) => {
	if (task.due.datetime) {
		const hour = new Date(task.due.datetime)
			.toTimeString()
			.split(" ")[0]
			.slice(0, 5);
		return "⌛ " + hour;
	}
};

export const completeTask = (Client, task) => {
	if (task)
		Client.task
			.completeTask(task.id)
			.then(() => notification({ body: lang.notifications.taskCompleted }));
};
