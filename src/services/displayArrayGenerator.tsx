import { getSubCommandText } from "cerebro-command-router";
import { filterByContent, filterByDate } from "./taskFilterServices";
import { completeTask } from "./taskServices";
import pDebounce from "p-debounce";
import { TaskInfo } from "../components";
import { dateGetter } from "./checkDate";
import lang from "../lang";
import { TDSClient } from "todoist-rest-client";
const strings = lang.displayArrayGenerator;


type Options = PartialOptions & {
	type?: "today" | "view"
}

type PartialOptions = {
	client: TDSClient,
	term: string,
	actions: object
}

const ItaskArrayGenerator = ({ type, ...props }: Options, showOverdue?: boolean) => {
	switch (type) {
		case "today":
			return todayTaskArrayGenerator(props, showOverdue);
		case "view":
			return otherDayTaskArrayGenerator(props);
		default:
			return todayTaskArrayGenerator(props, showOverdue);
	}
};

const todayTaskArrayGenerator = async (
	{ client, term, actions }: PartialOptions,
	showOverdue: boolean
) => {
	let taskArray;

	try {
		taskArray = showOverdue
			? await client.task.search({
					filter: "(today | overdue)",
					lang: "en",
			  })
			: await client.extras.getTodayTaskJSON();
	} catch {
		return [{ title: lang.TaskInfo.error }];
	}

	if (getSubCommandText(term)) {
		taskArray = filterByContent(taskArray, getSubCommandText(term));
		if (taskArray.length === 0)
			return [{ title: strings.noFilteredTasksFound }];
	}

	if (taskArray.length === 0) return [{ title: strings.noTodayTasks }];

	let newTaskArray = [];

	await Promise.all(
		taskArray.map(async (task) => {
			let projectName = (await client.project.get(task.project_id)).name;
			newTaskArray.push({
				...task,
				projectName,
			});
		})
	);

	return newTaskArray.map((task) => {
		return {
			title: task.content,
			onSelect: () => completeTask(client, task),
			getPreview: () => (
				<TaskInfo task={task} client={client} actions={actions} />
			),
		};
	});
};

const otherDayTaskArrayGenerator = async ({ client, term, actions }: PartialOptions) => {
	//sacar la fecha del subcomman, si hay
	const subCommandtext = getSubCommandText(term);
	if (!subCommandtext) return Promise.resolve([{ title: strings.dateNeeded }]);

	//comprobar que la fecha sea correcta
	const talVezDate = subCommandtext.split(" ")[0];

	const date = dateGetter(talVezDate);

	if (!date) return Promise.resolve([{ title: strings.invalidDate }]);

	//comporbar si hay algo más de texto, para buscar entre las tareas que obtengamos
	const filterTextArray = subCommandtext.split(" ");
	filterTextArray.shift();
	const filterText = filterTextArray.join(" ");

	//si es correcta procedemos a llamar al método de buscar en la api (ahorramos recursos ;) )
	let fullTasksList;
	try {
		fullTasksList = await client.task.getAll();
	} catch {
		return [{ title: lang.TaskInfo.error }];
	}

	//filtrarlas por fecha y contenido
	let dayTasksArray = filterByDate(fullTasksList, date);
	if (filterText) {
		dayTasksArray = filterByContent(dayTasksArray, filterText);
		if (dayTasksArray.length === 0)
			return [{ title: strings.noFilteredTasksFound }];
	}

	if (dayTasksArray.length === 0) return [{ title: strings.noXDayTasks }];

	let newTaskArray = [];

	await Promise.all(
		dayTasksArray.map(async (task) => {
			let projectName = (await client.project.get(task.project_id)).name;
			newTaskArray.push({
				...task,
				projectName,
			});
		})
	);

	return newTaskArray.map((task) => {
		return {
			title: task.content,
			onSelect: () => completeTask(client, task),
			getPreview: () => (
				<TaskInfo task={task} client={client} actions={actions} />
			),
		};
	});
};

const debouncedTaskArrayGenerator = pDebounce(ItaskArrayGenerator, 275);

export default debouncedTaskArrayGenerator;
