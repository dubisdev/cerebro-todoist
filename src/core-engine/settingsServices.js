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

function userUpdateTimeExists() {
	//try catch in case the config file not exists
	try {
		let json = getSettingsJSON();
		let supposedSetting =
			json["plugins"]["cerebro-todoist"]["Today tasks update delay"];
		if (supposedSetting) return true;
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

function getUserUpdateTime() {
	//if no settings found, returns 30 as default
	if (!userUpdateTimeExists()) return 30;
	let json = getSettingsJSON();
	let timeStr = json["plugins"]["cerebro-todoist"]["Today tasks update delay"];

	//no trycatch bc settings in cerebro lets us make sure it is a number
	let timeInt = parseInt(timeStr);

	//no negative time possible ;)
	return timeInt <= 0 ? 1 : timeInt;
}

export { getApiToken, getUserUpdateTime };
