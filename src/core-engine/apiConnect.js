import { Task } from "todoist-rest-client";
import { getTaskPriority, getTaskDescription } from "./textUtilities.js";

import { getSubCommandText } from "cerebro-command-router";

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
				due_string: "today",
				due_lang: "en",
				priority,
				description,
			})
		)
			.then(() => {
				new Notification("Task Created");
			})
			.catch((err) => {
				if (!err.response) {
					new Notification("Task couldn't be created: No internet conexion");
				} else if (err.response.status === 403) {
					new Notification(
						"Task couldn't be created: Please check the token in the cerebro-todoist settings."
					);
				}
			});
	}
}

export default apiInterface;
