import { notification } from "../components";
import { Task } from "todoist-rest-client";
import { getTaskPriority, getTaskDescription } from "./textUtilities.js";
import { getSubCommandText } from "cerebro-command-router";
import lang from "../lang";

export function createTask(Client, { text = "" } = {}) {
	let rudeText = getSubCommandText(text);
	const [description, taskTextWODescription] = getTaskDescription(rudeText);
	const [priority, taskText] = getTaskPriority(taskTextWODescription);

	return Client.create(
		{ type: "task" },
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
