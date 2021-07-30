import lang from "./lang";
const strings = lang.settings;

// ----------------- Plugin settings --------------------- //
export const name = "Todoist Workflow";
export const keyword = "tds";

export const settings = {
	token: {
		type: "string",
		defaultValue: "",
		description: strings.descriptionToken,
	},

	"New Task Command": {
		type: "string",
		defaultValue: "new",
		description: strings.descriptionNewCommand,
	},

	"Today Tasks Command": {
		type: "string",
		defaultValue: "today",
		description: strings.descriptionTodayCommand,
	},
};
// ----------------- END Plugin settings --------------------- //
