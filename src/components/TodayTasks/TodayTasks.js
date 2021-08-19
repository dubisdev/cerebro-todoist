import { Loading, KeyboardNav } from "../cerebro-ui";
import { TaskNavItem } from "../index";
import { completeTask } from "../../core-engine/taskServices";
import styles from "./styles.css";
import lang from "../../lang";

const TodayTasksInterface = ({ content, actions, client }) => {
	const strings = lang.TodayTasks;

	const action = (task) => {
		completeTask(client, task);
		actions.hideWindow();
	};

	if (content) {
		if (content.length === 0) {
			return (
				<div className={styles.wrapper}>
					<h2>{strings.todayTasks}</h2>
					{strings.noTasks}
				</div>
			);
		}
		return (
			<div className={styles.wrapper}>
				<h2>{strings.todayTasks}</h2>
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

export default TodayTasksInterface;
