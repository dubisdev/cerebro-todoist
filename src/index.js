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

let firstStart = true;

const plugin = ({ term, display, actions, settings, config }) => {
	if (settings["Send anonymous usage data"]) {
		const Bugsnag = require("@bugsnag/browser");
		Bugsnag.start({
			apiKey: "d89a1b69a37fb85e0b906ba614231b2a",
			appVersion: require("../package.json").version,
			logger: null,
			enabledBreadcrumbTypes: ["error", "navigation", "request", "user"],
			collectUserIp: false,
		});
	} else if (firstStart) {
		new Notification(strings.notificationSendData_title, {
			body: strings.notificationSendData_body,
			icon,
		});

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
};

export { icon, name, keyword, plugin as fn, settings, initialize };
