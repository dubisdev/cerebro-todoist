import { Loading, KeyboardNav, KeyboardNavItem } from "../cerebro-ui";
import styles from "./styles.css";
import lang from "../../lang";

const XDayTasksInterface = ({ content, actions, client }) => {
	let strings = lang.XDayTasks;
	const action = (task) => {
		if (task)
			client
				.completeTask({ TaskObject: task })
				.then(() => new Notification(lang.taskCompleted));

		actions.hideWindow();
	};

	if (content) {
		if (content.length === 0) {
			return (
				<div className={styles.wrapper}>
					<h2>{strings.no_tasks}</h2>
				</div>
			);
		}
		return (
			<div className={styles.wrapper}>
				<h2>
					{strings.day_tasks} {content[0].due.date}
				</h2>
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
