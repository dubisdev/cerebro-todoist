import styles from "./styles.module.css";
import lang from "lang";
const strings = lang.NewTodayTask;

const NewTaskInterface = () => (
  <div className={styles.wrapper}>
    <h2>{strings.title}</h2>
    {strings.description}
  </div>
);

export default NewTaskInterface;
