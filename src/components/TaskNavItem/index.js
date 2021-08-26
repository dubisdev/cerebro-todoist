import React from "react";
import { getTaskHour } from "../../core-engine/taskServices";
import styles from "./styles.css";

const TaskNavItem = ({ task, ...props }) => {
	const onClick = props.onSelect || (() => {});
	const onKeyDown = (event) => {
		if (props.onKeyDown) {
			props.onKeyDown(event);
		}
		const vimO = event.keyCode === 79 && (event.metaKey || event.ctrlKey);
		if (!event.defaultPrevented && (event.keyCode === 13 || vimO)) {
			onClick();
		}
	};
	const itemProps = {
		onClick,
		onKeyDown,
		tabIndex: 0,
	};
	return (
		<li {...props} {...itemProps} className={styles.item}>
			<div className={styles.floatLayout}>
				<span className={styles.floatLeft}>{task.content}</span>
				<span className={styles.floatRight}>{getTaskHour(task)}</span>
			</div>
		</li>
	);
};

export default TaskNavItem;
