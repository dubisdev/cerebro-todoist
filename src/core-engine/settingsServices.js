import fs from "fs";
import path from "path";

var dir = path.join(process.env.APPDATA, "Cerebro", "config.json");

function getSettingsJSON() {
	let text = fs.readFileSync(dir);
	let json = JSON.parse(text);
	return json;
}

function apiTokenExists() {
	//try catch in case the config file not exists
	try {
		let json = getSettingsJSON();
		let supposedToken = json["plugins"]["cerebro-todoist"]["token"];
		if (supposedToken) return true;
		else return false;
	} catch (err) {
		return false;
	}
}

function getApiToken() {
	if (!apiTokenExists()) return null;
	let json = getSettingsJSON();
	return json["plugins"]["cerebro-todoist"]["token"];
}

export { getApiToken };
