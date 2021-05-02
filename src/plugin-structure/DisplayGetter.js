import icon from "../icons";
import apiInterface from "../core-engine/apiConnect";

export default class DisplayGetter {
	constructor({ apiToken }) {
		this.myInterface = new apiInterface({ apiToken });
	}

	get({ action, getPreview, term }) {
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
