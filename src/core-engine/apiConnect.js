import { Task } from "todoist-rest-client";
import { getTaskPriority, getTaskDescription } from "./textUtilities.js";
import { getSubCommandText } from "cerebro-command-router";
import lang from "../lang";
const strings = lang.apiConnect;

class apiInterface {
	constructor(client) {
		this.Client = client;
	}

	createTask({ text = "" } = {}) {
		let rudeText = getSubCommandText(text);
		const [description, taskTextWODescription] = getTaskDescription(rudeText);
		const [priority, taskText] = getTaskPriority(taskTextWODescription);

		return this.Client.create(
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
				new Notification(strings.created);
			})
			.catch((err) => {
				if (!err.response) new Notification(strings.error_internet);
				else if (err.response.status === 403)
					new Notification(strings.error_token);
			});
	}
}

export default apiInterface;
