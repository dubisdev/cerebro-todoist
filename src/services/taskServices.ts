import { notification } from "../components";
import { Task } from "todoist-rest-client";
import { TDSClient, APITaskObject } from "todoist-rest-client/dist/definitions";
import {
	getTaskPriority,
	getTaskDescription,
	getTaskProject,
} from "./textUtilities.js";
import { getSubCommandText } from "cerebro-command-router";
import lang from "../lang";

export async function createTask(Client: TDSClient, { text = "" } = {}) {
	let rudeText = getSubCommandText(text);
	const [description, taskTextWODescription] = getTaskDescription(rudeText);
	const [priority, taskTextWProject] = getTaskPriority(taskTextWODescription);
	let [project_name, taskText] = getTaskProject(taskTextWProject);

	let project_id;
	if (project_name) {
		//get project id if exists
		let projects = await Client.project.getAll();

		let project = projects.find(({ name }) =>
			name.toLowerCase().includes(project_name.toLowerCase())
		);

		project_id = project?.id;

		//if no project id, return hastag to taskText
		if (!project_id) taskText = taskTextWProject;
	}

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

export const getTaskHour = (task: APITaskObject) => {
	if (!task.due.datetime) return;

	const hour = new Date(task.due.datetime)
		.toTimeString()
		.split(" ")[0]
		.slice(0, 5);
	return "⌛ " + hour;
};

export const completeTask = async (Client: TDSClient, task: APITaskObject) => {
	if (!task) return;
	await Client.task.close(task.id);
	notification({ body: lang.notifications.taskCompleted });
};

export const deleteTask = async (Client: TDSClient, task: APITaskObject) => {
	if (!task) return;
	await Client.task.delete(task.id);
	notification({ body: lang.notifications.taskDeleted });
};
