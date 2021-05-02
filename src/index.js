import { getSubCommand } from "./core-engine/commandManager";
import { TodayTasks, ReactComponent } from "./components";
import icon from "./icons";
import initializeAsync from "./plugin-structure/initialize";
import DisplayGetter from "./plugin-structure/DisplayGetter";

//pide Acceso a notificaciones
if (!Notification.permission) {
	Notification.requestPermission();
}

const appNames = ["tds", "Todoist Workflow"];
const appActionNames = ["New", "Today"];

let todayTasks;
const onMessage = (info) => {
	todayTasks = info;
};

function plugin({ term, display, actions, settings }) {
	const displayGetter = new DisplayGetter({ apiToken: settings.token });

	let match = appNames.some(
		(appName) => appName.toLowerCase() === term.split(" ")[0].toLowerCase()
	);

	if (match) {
		const displayArray = appActionNames
			.filter(
				(action) =>
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
