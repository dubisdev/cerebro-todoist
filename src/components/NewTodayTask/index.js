import styles from "./styles.module.css";
import lang from "../../lang";

const NewTaskInterface = () => {
  const strings = lang.NewTodayTask;
  return (
    <div className={styles.wrapper}>
      <h2>{strings.title}</h2>
      {strings.description}
    </div>
  );
};

export default NewTaskInterface;
