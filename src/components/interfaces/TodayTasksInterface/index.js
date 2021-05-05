import { Loading, KeyboardNav, KeyboardNavItem } from "../../cerebro-ui";
import styles from "./styles.css";
import { getApiToken } from "../../../core-engine/settingsServices";
import TDSClient from "todoist-rest-client";

const myClient = new TDSClient(getApiToken());

const TodayTasksInterface = ({ content, actions }) => {
	const action = (task) => {
		if (task) {
			myClient.completeTask({ TaskObject: task });
		}

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
									{task.content}
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
