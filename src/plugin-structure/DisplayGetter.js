import icon from "../icons";
import apiInterface from "../core-engine/apiConnect";
import { PreviewToday, NewTaskInterface } from "../components";

export default class DisplayGetter {
	constructor({ apiToken, noToken, actions }) {
		this.actions = actions;
		if (noToken) {
			this.noToken = noToken;
		} else {
			this.myInterface = new apiInterface({ apiToken });
		}
	}

	getEmpty() {
		return {
			term: `tds`,
			icon: icon,
			title: `Todoist Workflow`,
			getPreview: this.getPreview(),
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
			Nex: () => this.myInterface.createTask({ text: term }),
		};
		const noAction = null;

		return actionsObject[action] || noAction;
	}

	getPreview(action) {
		const previewsObject = {
			New: () => <NewTaskInterface />,
			Today: () => <PreviewToday actions={this.actions} />,
		};

		const invalidAction = () => <h3>Invalid Command</h3>;

		return previewsObject[action] || invalidAction;
	}
}
