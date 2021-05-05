import React from "react";
import styles from "./styles.css";

const Loading = () => {
	return (
		<div className={styles.spinner}>
			<div className={styles.bounce1}></div>
			<div className={styles.bounce2}></div>
			<div className={styles.bounce3}></div>
		</div>
	);
};

export default Loading;
