import { getSubCommandText } from "cerebro-command-router";
import { filterByContent, filterByDate } from "./taskFilterServices";
import { completeTask } from "./taskServices";
import pDebounce from "p-debounce";
import { TaskInfo } from "../components";
import { dateGetter } from "./checkDate";
import lang from "../lang";
const strings = lang.displayArrayGenerator;

const ItaskArrayGenerator = ({ type, ...props }) => {
	switch (type) {
		case "today":
			return todayTaskArrayGenerator(props);
		case "view":
			return otherDayTaskArrayGenerator(props);
		default:
			return todayTaskArrayGenerator(props);
	}
};

const todayTaskArrayGenerator = async ({ client, method, term, actions }) => {
	let taskArray;

	try {
		taskArray = await method();
	} catch (err) {
		return [{ title: lang.TaskInfo.error }];
	}

	if (getSubCommandText(term)) {
		taskArray = filterByContent(taskArray, getSubCommandText(term));
		if (taskArray.length === 0)
			return [{ title: strings.noFilteredTasksFound }];
	}

	if (taskArray.length === 0) return [{ title: strings.noTodayTasks }];

	return taskArray.map((task) => {
		return {
			title: task.content,
			onSelect: () => completeTask(client, task),
			getPreview: () => (
				<TaskInfo task={task} client={client} actions={actions} />
			),
		};
	});
};

const otherDayTaskArrayGenerator = async ({
	client,
	method,
	term,
	actions,
}) => {
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
		fullTasksList = await method();
	} catch (err) {
		return [
			{
				title: lang.TaskInfo.error,
			},
		];
	}

	//filtrarlas por fecha y contenido
	let dayTasksArray = filterByDate(fullTasksList, date);
	if (filterText) {
		dayTasksArray = filterByContent(dayTasksArray, filterText);
		if (dayTasksArray.length === 0)
			return [{ title: strings.noFilteredTasksFound }];
	}

	if (dayTasksArray.length === 0) return [{ title: strings.noXDayTasks }];

	return dayTasksArray.map((task) => ({
		title: task.content,
		onSelect: () => completeTask(client, task),
		getPreview: () => (
			<TaskInfo task={task} client={client} actions={actions} />
		),
	}));
};

const debouncedTaskArrayGenerator = pDebounce(ItaskArrayGenerator, 275);

export default debouncedTaskArrayGenerator;
