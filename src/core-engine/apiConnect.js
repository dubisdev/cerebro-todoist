import TDSClient, { Task } from "todoist-rest-client";
import {
	getSubCommandText,
	getTaskPriority,
	getTaskDescription,
} from "./textUtilities.js";

class apiInterface {
	constructor({ apiToken }) {
		this.Client = new TDSClient(apiToken);
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
				new Notification("Task couldn't be created");
			});
	}
}

export default apiInterface;
