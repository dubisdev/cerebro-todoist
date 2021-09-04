import CerebroRouter, { getSubCommandText } from "cerebro-command-router";
import TDSClient from "todoist-rest-client";
import { createTask, updateChecker, startPageAfterUpdate } from "./core-engine";
import icon from "./icons";
import { TodayTasks, NewTodayTask, XDayTasks } from "./components";
import strings from "./lang";
import { name, keyword, settings } from "./settings";

if (!Notification.permission) Notification.requestPermission();

const initialize = () => updateChecker();

const plugin = ({ term, display, actions, settings, update, config }) => {
	const token = settings.token;

	//no token --> pantalla de error
	if (!token && term.toLowerCase().includes("tds")) {
		display({
			icon: icon,
			title: strings.error,
			getPreview: () => <h3>{strings.noTokenFound}</h3>,
		});
	} else {
		const client = new TDSClient(token);

		const myRouter = new CerebroRouter({ command: "tds", term, display });

		startPageAfterUpdate(config, myRouter, actions);

		myRouter.route(settings["New Task Command"], {
			order: 1,
			icon: icon,
			title: strings.workflow_new,
			getPreview: () => <NewTodayTask />,
			onSelect: () => createTask(client, { text: term }),
		});

		myRouter.route(settings["Today Tasks Command"], {
			order: 0,
			icon: icon,
			title: strings.workflow_today,
			getPreview: () => <TodayTasks actions={actions} client={client} />,
		});

		myRouter.route(settings["View X Day Tasks Command"], {
			id: "xdaytasks",
			order: 2,
			icon: icon,
			title: strings.workflow_view,
			//get when intro key is pressed
			onKeyDown: (event) => {
				if (event.keyCode === 13) {
					event.preventDefault();
					update("xdaytasks", {
						getPreview: () => (
							<XDayTasks
								actions={actions}
								client={client}
								dayInfo={getSubCommandText(term)}
							/>
						),
					});
				}
			},
		});

		myRouter.invalidRoute({
			icon: icon,
			title: strings.invalidCommand,
		});
	}
};

export { icon, name, keyword, plugin as fn, settings, initialize };
