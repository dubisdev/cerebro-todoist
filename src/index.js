import { getSubCommand } from "./core-engine/textUtilities";
import { TodoistInterface } from "./components";
import icon from "./icons";
import initializeAsync from "./plugin-structure/initialize";
import DisplayGetter from "./plugin-structure/DisplayGetter";
import TDSClient from "todoist-rest-client";
import { getApiToken } from "./core-engine/settingsServices";

//pide Acceso a notificaciones
if (!Notification.permission) {
	Notification.requestPermission();
}

let error = false;
let content;

const onMessage = ({ errorExists = false }) => {
	error = errorExists;

	if (!errorExists) {
		let apiToken = getApiToken();
		let miCliente;
		if (apiToken) {
			miCliente = new TDSClient(apiToken);
			miCliente.getTodayTasks().then((res) => {
				content = res;
			});
		}
	}
};

function plugin({ term, display, actions, settings }) {
	let displayGetter;

	//checks if the initialize function returns error (token missing)
	if (error) {
		displayGetter = new DisplayGetter({ noToken: true });
	} else {
		displayGetter = new DisplayGetter({ apiToken: settings.token });
	}

	//match === true if the input is any of the appnames
	const appNames = ["tds", "Todoist Workflow"];
	let match = appNames.some(
		(appName) => appName.toLowerCase() === term.split(" ")[0].toLowerCase()
	);

	if (match) {
		const appActionNames = ["New"];
		//filters the action names
		const displayArray = appActionNames
			.filter(
				(action) =>
					//get subcomand gets the action "tds new" --> "new"
					!getSubCommand(term) ||
					action.toLowerCase().startsWith(getSubCommand(term))
			)
			.map((action) => {
				let getPreview = () => <TodoistInterface content={content} />;
				return displayGetter.get({ action, getPreview, term });
			});

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
	"Today tasks update delay": {
		type: "number",
		defaultValue: 30,
		description:
			"Seconds between each update of today's tasks (less time, more processing)",
	},
};
// ----------------- END Plugin settings --------------------- //

export {
	icon,
	name,
	keyword,
	plugin as fn,
	settings,
	initializeAsync,
	onMessage,
};
