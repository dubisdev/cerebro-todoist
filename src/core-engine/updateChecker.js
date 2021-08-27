import { notification } from "../components";
import lang from "../lang";
const semverGt = require("semver/functions/gt");

const currentVersion = require("../../package.json").version;

export default function updateChecker() {
	fetch("https://registry.npmjs.org/cerebro-todoist")
		.then((res) => res.json())
		.then((res) => {
			const updateExists = semverGt(res["dist-tags"]["latest"], currentVersion);
			if (updateExists)
				notification({
					body: lang.notifications.updateAvailable,
					isUpdate: true,
				});
		});
}
