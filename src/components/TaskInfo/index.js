import { KeyboardNav } from "../cerebro-ui";
import { TaskNavItem } from "../index";
import { completeTask, getTaskHour } from "../../core-engine/taskServices";
import styles from "./styles.css";
import lang from "../../lang";
const strings = lang.TaskInfo;

const TasksInfoPreview = ({ task, actions, client }) => {
	const action = (task) => {
		completeTask(client, task);
		actions.hideWindow();
	};

	return (
		<div className={styles.wrapper}>
			<h2 style={{ "text-align": "center" }}>{task.content}</h2>
			<KeyboardNav>
				<ul className={styles.list}>
					<TaskNavItem>{getTaskHour(task) || null}</TaskNavItem>
					<TaskNavItem>{task.description || null}</TaskNavItem>
					<TaskNavItem onSelect={() => action(task)}>
						{strings.completeTaskButton}
					</TaskNavItem>
				</ul>
			</KeyboardNav>
		</div>
	);
};

export default TasksInfoPreview;
