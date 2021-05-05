import TDSClient from "todoist-rest-client";
import { getApiToken } from "../core-engine/settingsServices";

function init(done) {
	let apitoken = getApiToken();
	if (!apitoken) {
		new Notification("Please check the token in the cerebro-todoist settings.");
		return Promise.resolve().then(done);
	}

	const cliente = new TDSClient(apitoken);
	cliente
		.getTodayTasks()
		.then(() => {
			var obj = {
				errorExists: false,
			};
			//checks the token every 30 minutes
			setTimeout(() => init(done), 30 * 60 * 1000);
			return obj;
		})
		.then((done) => done)
		.catch(() => {
			new Notification(
				"Please check the token in the cerebro-todoist settings."
			);
		})
		.then(done);
}

export default init;
