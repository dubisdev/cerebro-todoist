import icon from "../icons";
import apiInterface from "../core-engine/apiConnect";
import { PreviewToday } from "../components";

export default class DisplayGetter {
	constructor({ apiToken, noToken }) {
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
		switch (action) {
			case "New":
				return () => this.myInterface.createTask({ text: term });
			default:
				return null;
		}
	}

	getPreview(action) {
		switch (action) {
			case "New":
				return () => <PreviewToday />;
			case "Today":
				return () => <PreviewToday />;
			default:
				return () => <h3>Invalid Command</h3>;
		}
	}
}
