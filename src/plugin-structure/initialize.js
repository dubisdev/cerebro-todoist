import TDSClient from "todoist-rest-client";
import fs from "fs";
import path from "path";

const NO_ERROR_INTERVAL = 30 * 1000;
const ERROR_INTERVAL = 10 * 60 * 1000;

function getApiToken() {
	var dir = path.join(process.env.APPDATA, "Cerebro", "config.json");
	let text = fs.readFileSync(dir);
	let json = JSON.parse(text);
	return json["plugins"]["cerebro-todoist"]["token"];
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
			setTimeout(() => init(done), NO_ERROR_INTERVAL);
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
