import { Loading, KeyboardNav, KeyboardNavItem } from "../../cerebro-ui";
import styles from "./styles.css";

const TodayTasksInterface = ({ content }) => {
	if (content) {
		return (
			<div className={styles.wrapper}>
				<h2>Today Tasks</h2>
				{
					<KeyboardNav>
						<ul className={styles.list}>
							{content.map((task) => {
								return (
									<KeyboardNavItem tagName={"li"} key={task}>
										{task}
									</KeyboardNavItem>
								);
							})}
						</ul>
					</KeyboardNav>
				}
			</div>
		);
	} else return <Loading />;
};

export default TodayTasksInterface;
