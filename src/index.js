import icon from "./icons";
import checkToken from "./plugin-structure/checkToken";
import DisplayGetter from "./plugin-structure/DisplayGetter";
import TDSClient from "todoist-rest-client";
import { getSubCommand, getCommand } from "./core-engine/textUtilities";

//pide Acceso a notificaciones
if (!Notification.permission) Notification.requestPermission();

function plugin({ term, display, actions, settings }) {
	checkToken(settings.token);

	const client = new TDSClient(settings.token);

	let displayGetter = new DisplayGetter({ client, actions });

	//match === true if the input is any of the appnames
	const appNames = ["tds", "Todoist Workflow"];
	let match = appNames.some(
		(appName) => appName.toLowerCase() === getCommand(term).toLowerCase()
	);

	if (match) {
		if (
			process.env.noInternet !== "true" &&
			process.env.invalidToken !== "true"
		) {
			const appActionNames = ["New", "Today"];
			//filters the action names
			const displayArray = appActionNames
				.filter(
					(action) =>
						//get subcomand gets the action "tds new" --> "new"
						!getSubCommand(term) ||
						action.toLowerCase().startsWith(getSubCommand(term))
				)
				.map((action) => displayGetter.get({ action, term }));

			//si la longitud es 0, se devuelve una vacía
			if (displayArray.length === 0)
				displayArray.push(displayGetter.getEmpty());

			display(displayArray);
		} else if (process.env.noInternet === "true")
			display(displayGetter.getNoInternet());
		else display(displayGetter.getInvalidToken());
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
