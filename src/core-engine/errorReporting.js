import strings from "../lang";

export default (reportingPermission = false, icon) => {
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
		new Notification(strings.notificationSendData_title, {
			body: strings.notificationSendData_body,
			icon,
		});
	}
};
