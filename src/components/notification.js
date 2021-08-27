import iconDefault from "../icons";

export default ({
	title = "Cerebro-Todoist",
	body,
	icon = iconDefault,
	isUpdate,
}) => {
	let noti = new Notification(title, { body, icon });
	if (isUpdate) {
		noti.onclick = function (event) {
			event.preventDefault(); // Previene al buscador de mover el foco a la pestaña del Notification
			window.open("https://cerebro-todoist.dubis.dev/changelog", "_blank");
		};
	}
};
