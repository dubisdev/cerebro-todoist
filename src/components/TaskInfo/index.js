import { KeyboardNav } from "../cerebro-ui";
import { TaskNavItem } from "../index";
import {
	completeTask,
	deleteTask,
	getTaskHour,
} from "../../services/taskServices";
import styles from "./styles.module.css";
import lang from "../../lang";
const strings = lang.TaskInfo;

const TasksInfoPreview = ({ task, actions, client }) => {
	const complete = (task) => {
		completeTask(client, task);
		actions.hideWindow();
	};
	const del = (task) => {
		deleteTask(client, task);
		actions.hideWindow();
	};

	return (
		<div className={styles.wrapper}>
			<h2 style={{ "text-align": "center" }}>{task.content}</h2>
			<KeyboardNav>
				<ul className={styles.list}>
					<TaskNavItem>{getTaskHour(task) || null}</TaskNavItem>
					<TaskNavItem>{task.description || null}</TaskNavItem>
					<TaskNavItem>{task.projectName}</TaskNavItem>
					<TaskNavItem onSelect={() => complete(task)}>
						{strings.completeTaskButton}
					</TaskNavItem>
					<TaskNavItem onSelect={() => del(task)}>
						{strings.deleteTaskButton}
					</TaskNavItem>
				</ul>
			</KeyboardNav>
		</div>
	);
};

export default TasksInfoPreview;
