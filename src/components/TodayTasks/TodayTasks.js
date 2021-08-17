import { Loading, KeyboardNav, KeyboardNavItem } from "../cerebro-ui";
import { notification } from "../index";
import styles from "./styles.css";
import lang from "../../lang";

const TodayTasksInterface = ({ content, actions, client }) => {
	const strings = lang.TodayTasks;

	const action = (task) => {
		if (task)
			client
				.completeTask({ TaskObject: task })
				.then(() => notification({ body: lang.taskCompleted }));

		actions.hideWindow();
	};

	if (content) {
		if (content.length === 0) {
			return (
				<div className={styles.wrapper}>
					<h2>{strings.today_tasks}</h2>
					<KeyboardNav>
						<ul className={styles.list}>
							<KeyboardNavItem tagName={"li"} onSelect={() => action()}>
								{strings.no_tasks}
							</KeyboardNavItem>
						</ul>
					</KeyboardNav>
				</div>
			);
		}
		return (
			<div className={styles.wrapper}>
				<h2>{strings.today_tasks}</h2>
				<KeyboardNav>
					<ul className={styles.list}>
						{content.map((task) => (
							<KeyboardNavItem
								tagName={"li"}
								key={task.id}
								onSelect={() => action(task)}>
								<div className={styles.floatLayout}>
									<span className={styles.floatLeft}>{task.content}</span>
									<span className={styles.floatRight}>
										{(() => {
											const hour = new Date(task.due.datetime)
												.toTimeString()
												.split(" ")[0];
											if (hour !== "Invalid") return "|| ⌛ " + hour;
										})()}
									</span>
								</div>
							</KeyboardNavItem>
						))}
					</ul>
				</KeyboardNav>
			</div>
		);
	} else return <Loading />;
};

export default TodayTasksInterface;
