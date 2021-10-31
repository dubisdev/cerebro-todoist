import { notification } from "../components";
import { Task } from "todoist-rest-client";
import {
	getTaskPriority,
	getTaskDescription,
	getTaskProject,
} from "./textUtilities.js";
import { getSubCommandText } from "cerebro-command-router";
import lang from "../lang";

export async function createTask(Client, { text = "" } = {}) {
	let rudeText = getSubCommandText(text);
	const [description, taskTextWODescription] = getTaskDescription(rudeText);
	const [priority, taskTextWProject] = getTaskPriority(taskTextWODescription);
	const [project_name, taskText] = getTaskProject(taskTextWProject);

	//get project id if exists
	let project_id = await Client.project.getAllJSON().then((res) => {
		let project = res.find((project) => {
			return project.name.toLowerCase().includes(project_name.toLowerCase());
		});
		return project && project.id ? project.id : undefined;
	});

	try {
		await Client.task.create(
			Task({
				content: taskText,
				due_string: lang.taskServices.due_string,
				due_lang: lang.taskServices.due_lang,
				priority,
				description,
				project_id,
			})
		);
		notification({ body: lang.notifications.taskCreated });
	} catch (err) {
		if (!err.response)
			notification({ body: lang.notifications.createTaskErrorInternet });
		else if (err.response.status === 403)
			notification({ body: lang.notifications.createTaskErrorToken });
	}
}

export const getTaskHour = (task) => {
	if (!task.due.datetime) return;

	const hour = new Date(task.due.datetime)
		.toTimeString()
		.split(" ")[0]
		.slice(0, 5);
	return "⌛ " + hour;
};

export const completeTask = async (Client, task) => {
	if (!task) return;

	await Client.task.completeTask(task.id);
	notification({ body: lang.notifications.taskCompleted });
};

export const deleteTask = async (Client, task) => {
	if (!task) return;
	await Client.task.delete(task.id);
	notification({ body: lang.notifications.taskDeleted });
};
