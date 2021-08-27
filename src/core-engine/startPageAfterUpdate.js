import PluginUpdated from "../components/UpdatedPluginPage";
import icon from "../icons";
import { settings } from "../settings";
import lang from "../lang";

console.log(Object.keys(settings));

export default (config, myRouter, actions) => {
	let firstUpdateStart = getFirstUpdateStart(config);

	if (firstUpdateStart !== false) {
		myRouter.invalidRoute({
			icon,
			order: 0,
			title: lang.workflow_update,
			getPreview: () => <PluginUpdated actions={actions} config={config} />,
		});
	}
};

export const setFirstUpdateStartToFalse = (config) => {
	let jsonConfig = config.get("plugins");

	//delete old version entries --> filter for keys in settings.js
	let result = {};
	let key;
	for (key in jsonConfig["cerebro-todoist"]) {
		if (settings.hasOwnProperty(key)) {
			result[key] = jsonConfig["cerebro-todoist"][key];
		}
	}

	jsonConfig["cerebro-todoist"] = result;

	jsonConfig["cerebro-todoist"][
		`firstUpdateStart${require("../../package.json").version}`
	] = false;

	config.set("plugins", jsonConfig);
};

export const getFirstUpdateStart = (config) => {
	return config.get(["plugins"])["cerebro-todoist"][
		`firstUpdateStart${require("../../package.json").version}`
	];
};
