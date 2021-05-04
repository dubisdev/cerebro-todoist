import TDSClient from "todoist-rest-client";
import {
	getUserUpdateTime,
	getApiToken,
} from "../core-engine/settingsServices";

function init(done) {
	let apitoken = getApiToken();
	if (!apitoken) return;

	const cliente = new TDSClient(apitoken);
	cliente
		.getTodayTasks()
		.then(() => {
			var obj = {
				errorExists: false,
			};
			console.log(getUserUpdateTime());
			setTimeout(() => init(done), getUserUpdateTime() * 1000);
			return obj;
		})
		.then((done) => done)
		.catch(() => {
			new Notification(
				"Please check the token in the cerebro-todoist settings."
			);
			//setTimeout(() => init(done), getUserUpdateTime() * 1000);
			var obj = {
				errorExists: true,
			};
			return obj;
		})
		.then(done);
}

export default init;
