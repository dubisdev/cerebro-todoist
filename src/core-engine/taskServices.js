import { notification } from "../components";
import { Task } from "todoist-rest-client";
import { getTaskPriority, getTaskDescription } from "./textUtilities.js";
import { getSubCommandText } from "cerebro-command-router";
import lang from "../lang";
const strings = lang.taskServices;

export function createTask(Client, { text = "" } = {}) {
	let rudeText = getSubCommandText(text);
	const [description, taskTextWODescription] = getTaskDescription(rudeText);
	const [priority, taskText] = getTaskPriority(taskTextWODescription);

	return Client.create(
		{ type: "task" },
		new Task({
			content: taskText,
			due_string: strings.due_string,
			due_lang: strings.due_lang,
			priority,
			description,
		})
	)
		.then(() => {
			notification({ body: strings.created });
		})
		.catch((err) => {
			if (!err.response) notification({ body: strings.error_internet });
			else if (err.response.status === 403)
				notification({ body: strings.error_token });
		});
}
