import apiInterface from "./apiConnect.js";

export default class AppActionsObject {
	constructor({ apiToken }) {
		this.myInterface = new apiInterface({ apiToken });
	}

	getActions() {
		return {
			New: ({ text }) => {
				return this.myInterface.createTask({ text });
			},
		};
	}
}
