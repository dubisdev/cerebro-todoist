import icon from "../icons";
import apiInterface from "./apiConnect";
import { PreviewToday, NewTodayTask } from "../components";

export default class DisplayGetter {
	constructor({ noToken, actions, client }) {
		this.actions = actions;
		this.client = client;

		if (noToken) this.noToken = noToken;
		else this.myInterface = new apiInterface(client);
	}

	getEmpty() {
		return {
			term: `tds`,
			icon: icon,
			title: `Todoist Workflow`,
			getPreview: this.getPreview("noAction"),
		};
	}

	getNoInternet() {
		return {
			term: `tds`,
			icon: icon,
			title: `Todoist Workflow`,
			getPreview: this.getPreview("noInternet"),
		};
	}

	getInvalidToken() {
		return {
			term: `tds`,
			icon: icon,
			title: `Todoist Workflow`,
			getPreview: this.getPreview("invalidToken"),
		};
	}

	get({ action, term }) {
		if (this.noToken) {
			return {
				term: `tds ${action.toLowerCase()}`,
				icon: icon,
				title: `Todoist Workflow ${action}`,
				getPreview: () => (
					<h4>
						No token found or incorrect token. Please go to `plugins todoist`
						settings. Then restart the app.
					</h4>
				),
			};
		}

		return {
			term: `tds ${action.toLowerCase()}`,
			icon: icon,
			title: `Todoist Workflow ${action}`,
			getPreview: this.getPreview(action),
			onSelect: this.Action(action, term),
		};
	}

	Action(action, term) {
		const actionsObject = {
			New: () => this.myInterface.createTask({ text: term }),
		};
		const noAction = null;

		return actionsObject[action] || noAction;
	}

	getPreview(action) {
		const previewsObject = {
			New: () => <NewTodayTask />,
			Today: () => <PreviewToday actions={this.actions} client={this.client} />,
			noInternet: () => <h3>No internet conexion</h3>,
			invalidToken: () => <h3>Invalid token, check it please :)</h3>,
		};

		const invalidAction = () => <h3>Invalid Command</h3>;

		return previewsObject[action] || invalidAction;
	}
}
