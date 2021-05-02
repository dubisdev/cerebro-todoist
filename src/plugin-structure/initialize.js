import TDSClient from "todoist-rest-client";
import fs from "fs";
import path from "path";

const INTERVAL = 1 * 60 * 1000;
var dir = path.join(process.env.APPDATA, "Cerebro", "config.json");
let text = fs.readFileSync(dir);
let json = JSON.parse(text);
let apitoken = json["plugins"]["cerebro-todoist"]["token"];

function init(done) {
	const update = () => {
		//get today tasks
		const cliente = new TDSClient(apitoken);
		cliente.getTodayTasks().then(done);
		setTimeout(update, INTERVAL);
	};
	update();
}

export default init;
