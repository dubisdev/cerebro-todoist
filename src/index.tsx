import CerebroRouter from "cerebro-command-router";
import TDSClient from "todoist-rest-client";
import { createTask, updateChecker, startPageAfterUpdate } from "./services";
import icon from "./icons";
import { NewTodayTask } from "./components";
import strings from "./lang";
import { name, keyword, settings } from "./settings";
import taskArrayGenerator from "./services/displayArrayGenerator";

if (!Notification.permission) Notification.requestPermission();

const initialize = () => updateChecker();

const plugin = ({ term, display, actions, settings, config, hide }) => {
  if (!term.toLowerCase().includes("tds")) return;

  const token = settings.token;

  if (!token) {
    return display({
      icon: icon,
      title: strings.error,
      getPreview: () => <h3>{strings.noTokenFound}</h3>,
    });
  }
  const client = TDSClient(token);

  const myRouter = new CerebroRouter({ command: "tds", term, display, hide });

  startPageAfterUpdate(config, myRouter, actions);

  myRouter.route(settings["New Task Command"], {
    order: 1,
    icon: icon,
    title: strings.workflow_new,
    getPreview: () => <NewTodayTask />,
    onSelect: () => createTask(client, { text: term }),
  });

  myRouter.route(
    settings["Today Tasks Command"],
    {
      order: 0,
      icon: icon,
      title: strings.workflow_today,
    },
    {
      isAsyncArrayGenerator: true,
      loadingMessage: strings.gettingTasksMessage,
      displayArrayGenerator: () =>
        taskArrayGenerator({
          type: "today",
          client,
          term,
          actions,
          showOverdue: settings["Show Overdue"],
        }),
    }
  );

  myRouter.route(
    settings["View X Day Tasks Command"],
    {
      order: 2,
      icon: icon,
      title: strings.workflow_view,
    },
    {
      isAsyncArrayGenerator: true,
      loadingMessage: strings.gettingTasksMessage,
      displayArrayGenerator: () =>
        taskArrayGenerator({
          type: "view",
          client,
          term,
          actions,
        }),
    }
  );

  myRouter.invalidRoute({
    icon: icon,
    title: strings.invalidCommand,
  });
};

export { icon, name, keyword, plugin as fn, settings, initialize };
