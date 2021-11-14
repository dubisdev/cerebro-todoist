import { notification } from "../components";
import lang from "../lang";
import semverGt from "semver/functions/gt";

import pkgJson from "../../package.json";
let currentVersion = pkgJson.version;

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
