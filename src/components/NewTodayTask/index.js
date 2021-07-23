import styles from "./styles.css";
import lang from "../../lang";

const NewTaskInterface = () => {
	const strings = lang.NewTodayTask;
	return (
		<div className={styles.wrapper}>
			<h2>{strings.title}</h2>
			{strings.description}
			<ul>
				<li>{strings.li1}</li>
				<li>{strings.li2}</li>
			</ul>
		</div>
	);
};

export default NewTaskInterface;
