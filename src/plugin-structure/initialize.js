import TDSClient from "todoist-rest-client";
import fs from "fs";
import path from "path";
var dir = path.join(process.env.APPDATA, "Cerebro", "config.json");

const ERROR_INTERVAL = 10 * 60 * 1000;

function getApiToken() {
	let text = fs.readFileSync(dir);
	let json = JSON.parse(text);
	return json["plugins"]["cerebro-todoist"]["token"];
}

function getUserUpdateTime() {
	let text = fs.readFileSync(dir);
	let json = JSON.parse(text);
	return parseInt(
		json["plugins"]["cerebro-todoist"]["Today tasks update delay"]
	);
}

function init(done) {
	let apitoken = getApiToken();
	if (!apitoken) {
		return;
	}
	const cliente = new TDSClient(apitoken);
	cliente
		.getTodayTasks()
		.then((info) => {
			var obj = {
				info: info,
				errorExists: false,
			};
			setTimeout(() => init(done), getUserUpdateTime() * 1000);
			return obj;
		})
		.then((done) => done)
		.catch(() => {
			new Notification(
				"Please check the token in the cerebro-todoist settings."
			);
			setTimeout(() => init(done), ERROR_INTERVAL);
			var obj = {
				info: [""],
				errorExists: true,
			};
			return obj;
		})
		.then(done);
}

export default init;
