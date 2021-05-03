import { getSubCommand } from "./core-engine/textUtilities";
import { TodayTasks, ReactComponent } from "./components";
import icon from "./icons";
import initializeAsync from "./plugin-structure/initialize";
import DisplayGetter from "./plugin-structure/DisplayGetter";

//pide Acceso a notificaciones
if (!Notification.permission) {
	Notification.requestPermission();
}

let todayTasks;
let error = false;
const onMessage = ({ info, errorExists = false }) => {
	error = errorExists;
	todayTasks = info;
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
				let getPreview;

				switch (action.toLowerCase()) {
					case "today":
						getPreview = () => <TodayTasks content={todayTasks} />;
						break;
					case "new":
						getPreview = () => <ReactComponent />;
				}

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
