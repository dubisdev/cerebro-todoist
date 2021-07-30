import icon from "./icons";
import CerebroRouter from "cerebro-command-router";
import { PreviewToday, NewTodayTask } from "./components";
import TDSClient from "todoist-rest-client";
import apiInterface from "./core-engine/apiConnect";
import strings from "./lang";
import { name, keyword, settings } from "./settings";

//pide Acceso a notificaciones
if (!Notification.permission) Notification.requestPermission();

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
			icon: icon,
			title: strings.workflow_new,
			getPreview: () => <NewTodayTask />,
			onSelect: () => myInterface.createTask({ text: term }),
		});

		myRouter.route(settings["Today Tasks Command"], {
			icon: icon,
			title: strings.workflow_today,
			getPreview: () => <PreviewToday actions={actions} client={client} />,
		});

		myRouter.invalidRoute({
			icon: icon,
			title: strings.invalid_command,
		});
	}
}

export { icon, name, keyword, plugin as fn, settings };
