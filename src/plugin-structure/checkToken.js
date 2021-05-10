import TDSClient from "todoist-rest-client";
import { getApiToken } from "../core-engine/settingsServices";

export default () => {
	let apitoken = getApiToken();
	if (!apitoken) {
		new Notification("Please check the token in the cerebro-todoist settings.");
	} else {
		const cliente = new TDSClient(apitoken);
		cliente.getTodayTasks().catch(() => {
			new Notification(
				"Please check the token in the cerebro-todoist settings."
			);
		});
	}
};
