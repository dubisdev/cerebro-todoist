import { notification } from "../components";
import lang from "../lang";

export default (reportingPermission = false) => {
	const strings = lang.notifications;
	if (reportingPermission) {
		const Bugsnag = require("@bugsnag/browser");
		Bugsnag.start({
			apiKey: "d89a1b69a37fb85e0b906ba614231b2a",
			appVersion: require("../../package.json").version,
			logger: null,
			enabledBreadcrumbTypes: ["error", "navigation", "request", "user"],
			collectUserIp: false,
		});
	} else {
		notification({
			title: strings.sendData_title,
			body: strings.sendData_body,
		});
	}
};
