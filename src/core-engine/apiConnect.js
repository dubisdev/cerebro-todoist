import TDSClient, { Task } from "todoist-rest-client";
import { getSubCommandText } from "./textUtilities.js";

class apiInterface {
	constructor({ apiToken }) {
		this.Client = new TDSClient(apiToken);
	}

	createTask({ text = "" } = {}) {
		let task = getSubCommandText(text);

		return this.Client.create(
			{ type: "task" },
			new Task({ content: task, due_string: "today", due_lang: "en" })
		).then((res) => {
			if (res === true) {
				return new Notification("Task Created");
			} else {
				return new Notification("Task couldn't be created");
			}
		});
	}
}

export default apiInterface;
