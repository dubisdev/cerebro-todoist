import icon from "./icons";
import CerebroRouter from "cerebro-command-router";
import { PreviewToday, NewTodayTask } from "./components";
import TDSClient from "todoist-rest-client";
import apiInterface from "./core-engine/apiConnect";

//pide Acceso a notificaciones
if (!Notification.permission) Notification.requestPermission();

function plugin({ term, display, actions, settings }) {
	//si no hay token se muestra la pantalla de error
	if (!settings.token) {
		display({
			icon: icon,
			title: `Todoist Workflow Error`,
			getPreview: () => <h3>No token found :(</h3>,
		});
	} else {
		const client = new TDSClient(settings.token);

		const myInterface = new apiInterface(client);

		const myRouter = new CerebroRouter({ command: "tds", term, display });

		myRouter.route("new", {
			icon: icon,
			title: `Todoist Workflow New`,
			getPreview: () => <NewTodayTask />,
			onSelect: () => myInterface.createTask({ text: term }),
		});

		myRouter.route("today", {
			icon: icon,
			title: `Todoist Workflow Today`,
			getPreview: () => <PreviewToday actions={actions} client={client} />,
		});

		myRouter.invalidRoute({
			icon: icon,
			title: `Invalid Todoist Workflow Command`,
		});
	}
}

// ----------------- Plugin settings --------------------- //
const name = "Todoist Workflow";
const keyword = "tds";

let settings = {
	token: {
		type: "string",
		defaultValue: "",
		description: "Your Todoist API Token",
	},
};
// ----------------- END Plugin settings --------------------- //

export { icon, name, keyword, plugin as fn, settings };
