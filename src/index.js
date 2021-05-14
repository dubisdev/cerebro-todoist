import { getSubCommand, getCommand } from "./core-engine/textUtilities";
import icon from "./icons";
import DisplayGetter from "./plugin-structure/DisplayGetter";
import checkToken from "./plugin-structure/checkToken";

//pide Acceso a notificaciones
if (!Notification.permission) {
	Notification.requestPermission();
}

function plugin({ term, display, actions, settings }) {
	let displayGetter = new DisplayGetter({ apiToken: settings.token, actions });

	//match === true if the input is any of the appnames
	const appNames = ["tds", "Todoist Workflow"];
	let match = appNames.some(
		(appName) => appName.toLowerCase() === getCommand(term).toLowerCase()
	);

	if (match) {
		checkToken();

		const appActionNames = ["New", "Today"];
		//filters the action names
		const displayArray = appActionNames
			.filter(
				(action) =>
					//get subcomand gets the action "tds new" --> "new"
					!getSubCommand(term) ||
					action.toLowerCase().startsWith(getSubCommand(term))
			)
			.map((action) => {
				return displayGetter.get({ action, term });
			});

		if (displayArray.length === 0) {
			displayArray.push(displayGetter.getEmpty());
		}

		display(displayArray);
	}
}

// ----------------- Plugin settings --------------------- //
const name = "Todoist Workflow";
const keyword = "tds";

let settings = {
	token: {
		type: "string",
		defaultValue: "",
		description: "Your Todoist api Token",
	},
};
// ----------------- END Plugin settings --------------------- //

export { icon, name, keyword, plugin as fn, settings };
