import AppActionsObject from "./core-engine/appActions";
import { getSubCommand } from "./core-engine/commandManager";
import icons from "./icons";
import ReactComponent from "./ReactComponent";

//pide Acceso a notificaciones
if (!Notification.permission) {
	Notification.requestPermission();
}

// ----------------- Default settings --------------------- //
let theme = "dark";
const name = "Todoist Workflow";
const keyword = "tds";
const icon = icons[theme].general;
// ----------------- END Default settings --------------------- //

const getPreview = () => <ReactComponent />;

const appNames = ["tds", "Todoist Workflow"];

function plugin({ term, display, actions, config, settings }) {
	theme = config.get("theme").includes("dark") ? "dark" : "light";

	const myAppObject = new AppActionsObject({ apiToken: settings.token });

	let match = appNames.some(
		(appName) => appName.toLowerCase() === term.split(" ")[0].toLowerCase()
	);

	if (match) {
		const appActions = myAppObject.getActions();
		const displayArray = Object.keys(appActions)
			.filter(
				(action) =>
					!getSubCommand(term) ||
					action.toLowerCase().startsWith(getSubCommand(term))
			)
			.map((action, i) => ({
				term: `tds ${action.toLowerCase()}`,
				id: i.toString(),
				icon: icons[theme]["general"],
				title: `${name} ${action}`,
				getPreview,
				onSelect: (event) => appActions[action]({ text: term }),
			}));
		display(displayArray);
	}
}

let settings = {
	token: {
		type: "string",
		defaultValue: "",
		description: "Your todoist api Token",
	},
};

export { icon, name, keyword, plugin as fn, settings };
