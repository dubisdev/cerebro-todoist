import { notification } from "../components";
import lang from "../lang";
import semverGt from "semver/functions/gt";

import pkgJson from "../../package.json";
let currentVersion = pkgJson.version;

export default async function updateChecker() {
  let res = await (
    await fetch("https://registry.npmjs.org/cerebro-cerebro-todoist")
  ).json();

  const updateExists = semverGt(res["dist-tags"]["latest"], currentVersion);
  if (updateExists)
    notification({
      body: lang.notifications.updateAvailable,
      isUpdate: true,
    });
}
