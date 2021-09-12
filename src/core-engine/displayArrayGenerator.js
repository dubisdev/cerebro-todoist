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

const todayTaskArrayGenerator = ({ client, method, term, actions }) => {
	return method()
		.then((res) => {
			let taskArray = res;
			if (getSubCommandText(term)) {
				taskArray = filterByContent(res, getSubCommandText(term));
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
		})
		.catch((err) => [
			{
				title: lang.TaskInfo.error,
			},
		]);
};

const otherDayTaskArrayGenerator = ({ client, method, term, actions }) => {
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

	return (
		method()
			//filtrarlas por fecha
			.then((res) => filterByDate(res, date))
			.then((tasks) => {
				let taskArray = tasks;
				//filtrarlas por contenido
				if (filterText) {
					taskArray = filterByContent(tasks, filterText);
					if (taskArray.length === 0)
						return [{ title: strings.noFilteredTasksFound }];
				}

				if (taskArray.length === 0) return [{ title: strings.noXDayTasks }];

				return taskArray.map((task) => {
					return {
						title: task.content,
						onSelect: () => completeTask(client, task),
						getPreview: () => (
							<TaskInfo task={task} client={client} actions={actions} />
						),
					};
				});
			})
			.catch((err) => [
				{
					title: lang.TaskInfo.error,
				},
			])
	);
};

const debouncedTaskArrayGenerator = pDebounce(ItaskArrayGenerator, 275);

export default debouncedTaskArrayGenerator;
