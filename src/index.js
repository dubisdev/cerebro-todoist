import CerebroRouter, { getSubCommandText } from "cerebro-command-router";
import TDSClient from "todoist-rest-client";
import {
	configureErrorReporting,
	createTask,
	updateChecker,
} from "./core-engine";
import icon from "./icons";
import { TodayTasks, NewTodayTask, XDayTasks } from "./components";
import strings from "./lang";
import { name, keyword, settings } from "./settings";

//pide Acceso a notificaciones
if (!Notification.permission) Notification.requestPermission();

const initialize = () => updateChecker();

let firstStart = true;

const plugin = ({ term, display, actions, settings, update, config }) => {
	if (firstStart) {
		configureErrorReporting(settings["Send anonymous usage data"]);
		firstStart = false;
	}

	const token = settings.token;

	//si no hay token se muestra la pantalla de error
	if (!token && term.toLowerCase().includes("tds")) {
		display({
			icon: icon,
			title: strings.error,
			getPreview: () => <h3>{strings.noTokenFound}</h3>,
		});
	} else {
		const client = new TDSClient(token);

		const myRouter = new CerebroRouter({ command: "tds", term, display });

		//Routing commands
		myRouter.route(settings["New Task Command"], {
			order: 1,
			icon: icon,
			title: strings.workflow_new,
			getPreview: () => <NewTodayTask />,
			onSelect: () => createTask(client, { text: term }),
		});

		myRouter.route(settings["Today Tasks Command"], {
			order: 0,
			icon: icon,
			title: strings.workflow_today,
			getPreview: () => <TodayTasks actions={actions} client={client} />,
		});

		myRouter.route(settings["View X Day Tasks Command"], {
			id: "xdaytasks",
			order: 2,
			icon: icon,
			title: strings.workflow_view,
			//only do get when intro key is pressed
			onKeyDown: (event) => {
				if (event.keyCode === 13) {
					event.preventDefault();
					update("xdaytasks", {
						getPreview: () => (
							<XDayTasks
								actions={actions}
								client={client}
								dayInfo={getSubCommandText(term)}
							/>
						),
					});
				}
			},
		});

		myRouter.invalidRoute({
			icon: icon,
			title: strings.invalidCommand,
		});
	}
};

export { icon, name, keyword, plugin as fn, settings, initialize };
