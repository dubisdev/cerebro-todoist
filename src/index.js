import { getSubCommand, getCommand } from "./core-engine/textUtilities";
import icon from "./icons";
import DisplayGetter from "./plugin-structure/DisplayGetter";
import checkToken from "./plugin-structure/checkToken";

//pide Acceso a notificaciones
if (!Notification.permission) Notification.requestPermission();

function plugin({ term, display, actions, settings }) {
	//hacer un check del token
	//crear un cliente de todoist
	//crear el displaygetter pasándole el cliente y las actions (funciones utiles como cerrar la ventana)
	//el cliente se reutiliza para todos los componentes, de manera que con el settings.token vale para toda la app

	let displayGetter = new DisplayGetter({ apiToken: settings.token, actions });

	//match === true if the input is any of the appnames
	const appNames = ["tds", "Todoist Workflow"];
	let match = appNames.some(
		(appName) => appName.toLowerCase() === getCommand(term).toLowerCase()
	);

	if (match) {
		//aqui ya no haría falta hacer el check del token ;)
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
			.map((action) => displayGetter.get({ action, term }));

		//si la longitud es 0, se devuelve una vacía
		if (displayArray.length === 0) displayArray.push(displayGetter.getEmpty());

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
		description: "Your Todoist API Token",
	},
};
// ----------------- END Plugin settings --------------------- //

export { icon, name, keyword, plugin as fn, settings };
