import icon from "./icons";
import CerebroRouter, { getSubCommandText } from "cerebro-command-router";
import { TodayTasks, NewTodayTask, XDayTasks } from "./components";
import TDSClient from "todoist-rest-client";
import apiInterface from "./core-engine/apiConnect";
import updateChecker from "./core-engine/updateChecker";
import strings from "./lang";
import { name, keyword, settings } from "./settings";

//pide Acceso a notificaciones
if (!Notification.permission) Notification.requestPermission();

const initialize = () => updateChecker(strings.updateAvailable);

function plugin({ term, display, actions, settings, config }) {
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

		const myInterface = new apiInterface(client);

		const myRouter = new CerebroRouter({ command: "tds", term, display });

		myRouter.route(settings["New Task Command"], {
			order: 1,
			icon: icon,
			title: strings.workflow_new,
			getPreview: () => <NewTodayTask />,
			onSelect: () => myInterface.createTask({ text: term }),
		});

		myRouter.route(settings["Today Tasks Command"], {
			order: 0,
			icon: icon,
			title: strings.workflow_today,
			getPreview: () => <TodayTasks actions={actions} client={client} />,
		});

		myRouter.route(settings["View X Day Tasks Command"], {
			order: 2,
			icon: icon,
			title: strings.workflow_view,
			getPreview: () => (
				<XDayTasks
					actions={actions}
					client={client}
					dayInfo={getSubCommandText(term)}
				/>
			),
		});

		myRouter.invalidRoute({
			icon: icon,
			title: strings.invalid_command,
		});
	}
}

export { icon, name, keyword, plugin as fn, settings, initialize };
