import { Loading, KeyboardNav } from "../cerebro-ui";
import TaskNavItem from "../TaskNavItem";
import { completeTask } from "../../core-engine/taskServices";
import styles from "./styles.css";
import lang from "../../lang";

const XDayTasksInterface = ({ content, actions, client }) => {
	let strings = lang.XDayTasks;
	const action = (task) => {
		completeTask(client, task);
		actions.hideWindow();
	};

	if (content) {
		if (content.length === 0) return <h2>{strings.noTasks}</h2>;

		let date = new Date(content[0].due.date).toLocaleDateString();

		return (
			<div className={styles.wrapper}>
				<h2>{strings.dayTasks + " " + date}</h2>
				<KeyboardNav>
					<ul className={styles.list}>
						{content.map((task) => (
							<TaskNavItem
								key={task.id}
								task={task}
								onSelect={() => action(task)}
							/>
						))}
					</ul>
				</KeyboardNav>
			</div>
		);
	} else return <Loading />;
};

export default XDayTasksInterface;
