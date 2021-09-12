import React from "react";
import styles from "./styles.css";

const TaskNavItem = ({ children, ...props }) => {
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

	if (children)
		return (
			<li {...props} {...itemProps} className={styles.item}>
				<div className={styles.centerLayout}>{children}</div>
			</li>
		);
	else return null;
};

export default TaskNavItem;
