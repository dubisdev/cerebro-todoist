const semverGt = require("semver/functions/gt");

const currentVersion = require("../../package.json").version;

export default function updateChecker(msg) {
	fetch("https://registry.npmjs.org/cerebro-todoist")
		.then((res) => res.json())
		.then((res) => {
			const updateExists = semverGt(res["dist-tags"]["latest"], currentVersion);
			if (updateExists) new Notification(msg);
		});
}
