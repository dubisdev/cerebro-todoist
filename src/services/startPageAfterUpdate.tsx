import PluginUpdated from "components/UpdatedPluginPage";
import icon from "../icons";
import { settings } from "../settings";
import lang from "../lang";
import pkgJson from "../../package.json";
import CerebroRouter from "cerebro-command-router";
import {
  CerebroActions,
  CerebroConfig,
} from "cerebro-command-router/dist/definitions";

export default (
  config: CerebroConfig,
  myRouter: CerebroRouter,
  actions: CerebroActions
) => {
  let firstUpdateStart = getFirstUpdateStart(config);

  // undefined == not set == first update start
  if (firstUpdateStart === undefined) {
    myRouter.invalidRoute({
      icon,
      order: 0,
      title: lang.workflow_update,
      getPreview: () => <PluginUpdated actions={actions} config={config} />,
    });
  }
};

export const setFirstUpdateStartToFalse = (config: CerebroConfig) => {
  let jsonConfig = config.get("plugins");

  //delete old version entries --> filter for keys in settings.js
  let result = {};

  for (let key in jsonConfig["cerebro-cerebro-todoist"]) {
    if (settings.hasOwnProperty(key)) {
      result[key] = jsonConfig["cerebro-cerebro-todoist"][key];
    }
  }

  // save previous settings
  jsonConfig["cerebro-cerebro-todoist"] = result;

  // update firstUpdateStart
  jsonConfig["cerebro-cerebro-todoist"][`firstUpdateStart${pkgJson.version}`] =
    false;

  config.set("plugins", jsonConfig);
};

export const getFirstUpdateStart = (config: CerebroConfig) => {
  return config.get("plugins")["cerebro-cerebro-todoist"]?.[
    `firstUpdateStart${pkgJson.version}`
  ];
};
