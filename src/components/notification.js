import iconDefault from "../icons";

export default ({ title = "Cerebro-Todoist", body, icon = iconDefault }) => {
	new Notification(title, { body, icon });
};
