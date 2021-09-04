import CerebroRouter, { getSubCommandText } from "cerebro-command-router";
import TDSClient from "todoist-rest-client";
import { createTask, updateChecker, startPageAfterUpdate } from "./core-engine";
import icon from "./icons";
import { NewTodayTask } from "./components";
import strings from "./lang";
import { name, keyword, settings } from "./settings";
import taskArrayGenerator from "./core-engine/displayArrayGenerator";

if (!Notification.permission) Notification.requestPermission();

const initialize = () => updateChecker();

const plugin = ({ term, display, actions, settings, config, hide }) => {
	const token = settings.token;

	//no token --> pantalla de error
	if (!token && term.toLowerCase().includes("tds")) {
		display({
			icon: icon,
			title: strings.error,
			getPreview: () => <h3>{strings.noTokenFound}</h3>,
		});
	} else {
		const client = new TDSClient(token);

		const myRouter = new CerebroRouter({ command: "tds", term, display, hide });

		startPageAfterUpdate(config, myRouter, actions);

		myRouter.route(settings["New Task Command"], {
			order: 1,
			icon: icon,
			title: strings.workflow_new,
			getPreview: () => <NewTodayTask />,
			onSelect: () => createTask(client, { text: term }),
		});

		myRouter.route(
			settings["Today Tasks Command"],
			{
				order: 0,
				icon: icon,
				title: strings.workflow_today,
			},
			{
				showOnlyInFullMatch: true,
				isAsyncArrayGenerator: true,
				loadingMessage: "Está cargando coño",
				displayArrayGenerator: () =>
					taskArrayGenerator({
						client,
						method: () => client.getTodayTasksJSON(),
						term,
						actions,
					}),
			}
		);

		myRouter.route(
			settings["View X Day Tasks Command"],
			{
				order: 2,
				icon: icon,
				title: strings.workflow_view,
			},
			{
				showOnlyInFullMatch: true,
				isAsyncArrayGenerator: true,
				loadingMessage: "Está cargando coño",
				displayArrayGenerator: () =>
					taskArrayGenerator({
						type: "view",
						client,
						method: () => client.getAllJSON(),
						term,
						actions,
					}),
			}
		);

		myRouter.invalidRoute({
			icon: icon,
			title: strings.invalidCommand,
		});
	}
};

export { icon, name, keyword, plugin as fn, settings, initialize };
