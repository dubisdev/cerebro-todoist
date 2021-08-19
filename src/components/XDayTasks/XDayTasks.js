import { Loading, KeyboardNav, KeyboardNavItem } from "../cerebro-ui";
import { notification } from "../index";
import styles from "./styles.css";
import lang from "../../lang";

const XDayTasksInterface = ({ content, actions, client }) => {
	let strings = lang.XDayTasks;
	const action = (task) => {
		if (task)
			client
				.completeTask({ TaskObject: task })
				.then(() => notification({ body: lang.notification.taskCompleted }));

		actions.hideWindow();
	};

	if (content) {
		if (content.length === 0) {
			return (
				<div className={styles.wrapper}>
					<h2>{strings.noTasks}</h2>
				</div>
			);
		}

		let date = new Date(content[0].due.date).toLocaleDateString();

		return (
			<div className={styles.wrapper}>
				<h2>{strings.dayTasks + " " + date}</h2>
				<KeyboardNav>
					<ul className={styles.list}>
						{content.map((task) => (
							<KeyboardNavItem
								tagName={"li"}
								key={task.id}
								onSelect={() => action(task)}>
								<div className={styles.floatLayout}>{task.content}</div>
							</KeyboardNavItem>
						))}
					</ul>
				</KeyboardNav>
			</div>
		);
	} else return <Loading />;
};

export default XDayTasksInterface;
