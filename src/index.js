import icon from "./icons";
import CerebroRouter from "cerebro-command-router";
import { PreviewToday, NewTodayTask } from "./components";
import TDSClient from "todoist-rest-client";
import apiInterface from "./core-engine/apiConnect";
import strings from "./lang";

//pide Acceso a notificaciones
if (!Notification.permission) Notification.requestPermission();

function plugin({ term, display, actions, settings, config }) {
	//si no hay token se muestra la pantalla de error
	if (!settings.token) {
		display({
			icon: icon,
			title: strings.error,
			getPreview: () => <h3>{strings.noTokenFound}</h3>,
		});
	} else {
		const client = new TDSClient(settings.token);

		const myInterface = new apiInterface(client);

		const myRouter = new CerebroRouter({ command: "tds", term, display });

		myRouter.route("new", {
			icon: icon,
			title: strings.workflow_new,
			getPreview: () => <NewTodayTask />,
			onSelect: () => myInterface.createTask({ text: term }),
		});

		myRouter.route("today", {
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

// ----------------- Plugin settings --------------------- //
const name = "Todoist Workflow";
const keyword = "tds";

const s_settings = strings.settings;
const settings = {
	token: {
		type: "string",
		defaultValue: "",
		description: s_settings.description,
	},
};
// ----------------- END Plugin settings --------------------- //

export { icon, name, keyword, plugin as fn, settings };
