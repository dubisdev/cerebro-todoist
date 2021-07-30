import strings from "./lang";
// ----------------- Plugin settings --------------------- //
export const name = "Todoist Workflow";
export const keyword = "tds";

const s_settings = strings.settings;
export const settings = {
	"API Token": {
		type: "string",
		defaultValue: "",
		description: s_settings.description,
	},

	"New Task Command": {
		type: "string",
		defaultValue: "new",
		description: "Customize the command for creating new tasks.",
	},

	"Today Tasks Command": {
		type: "string",
		defaultValue: "today",
		description: "Customize the command for showing today tasks.",
	},
};
// ----------------- END Plugin settings --------------------- //
