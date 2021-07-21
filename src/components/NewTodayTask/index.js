import styles from "./styles.css";

const NewTaskInterface = () => {
	return (
		<div className={styles.wrapper}>
			<h2>New Todoist Task</h2>
			Creates a new Todoist task in your inbox for today.
			<ul>
				<li>Use !!number to indicate priority</li>
				<li>Use :: to separate task name from description</li>
			</ul>
		</div>
	);
};

export default NewTaskInterface;
