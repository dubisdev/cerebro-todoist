import icon from "../icons";
import apiInterface from "../core-engine/apiConnect";

export default class DisplayGetter {
	constructor({ apiToken, noToken }) {
		if (noToken) {
			this.noToken = noToken;
		} else {
			this.myInterface = new apiInterface({ apiToken });
		}
	}

	get({ action, getPreview, term }) {
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
			getPreview: getPreview,
			onSelect: this.Action(action, term),
		};
	}

	Action(action, term) {
		switch (action) {
			case "Today":
				return null;
			case "New":
				return () => this.myInterface.createTask({ text: term });
		}
	}
}
