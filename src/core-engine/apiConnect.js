import TDSClient, { Task } from "todoist-rest-client";
import { getSubCommandText } from "./textUtilities.js";

class apiInterface {
	constructor({ apiToken }) {
		this.Client = new TDSClient(apiToken);
	}

	createTask({ text = "" } = {}) {
		let task = getSubCommandText(text);
		this.Client.create(
			{ type: "task" },
			new Task({ content: task, due_string: "today", due_lang: "en" })
		);
		return new Notification("Task Created");
	}
}

export default apiInterface;
