import { Loading, KeyboardNav, KeyboardNavItem } from "../cerebro-ui";
import styles from "./styles.css";

const TodayTasksInterface = ({ content, actions, client }) => {
	const action = (task) => {
		if (task) client.completeTask({ TaskObject: task });

		actions.hideWindow();
	};

	if (content) {
		if (content.length === 0) {
			return (
				<div className={styles.wrapper}>
					<h2>Today Tasks</h2>

					<KeyboardNav>
						<ul className={styles.list}>
							<KeyboardNavItem tagName={"li"} onSelect={() => action()}>
								No tasks for today! Is this #TodoistZero ?
							</KeyboardNavItem>
						</ul>
					</KeyboardNav>
				</div>
			);
		}
		return (
			<div className={styles.wrapper}>
				<h2>Today Tasks</h2>
				<KeyboardNav>
					<ul className={styles.list}>
						{content.map((task) => {
							return (
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
							);
						})}
					</ul>
				</KeyboardNav>
			</div>
		);
	} else return <Loading />;
};

export default TodayTasksInterface;
