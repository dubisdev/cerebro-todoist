import TDSClient from "todoist-rest-client";

export default (apitoken) => {
	if (!apitoken)
		new Notification("Please check the token in the cerebro-todoist settings.");
	else {
		const cliente = new TDSClient(apitoken);
		cliente
			.getTodayTasks()
			.then(() => {
				process.env.noInternet = "false";
				process.env.invalidToken = "false";
			})
			.catch((err) => {
				if (!err.response) {
					if (process.env.noInternet !== "true") {
						process.env.noInternet = "true";
						new Notification("No internet conexion");
					}
					return;
				} else if (err.response.status === 403) {
					if (process.env.invalidToken !== "true") {
						process.env.invalidToken = "true";
						new Notification(
							"Please check the token in the cerebro-todoist settings."
						);
					}
					return;
				}
			});
	}
};
