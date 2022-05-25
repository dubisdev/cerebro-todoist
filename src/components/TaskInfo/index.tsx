import { KeyboardNavItem, KeyboardNav } from "../index";
import {
  completeTask,
  deleteTask,
  getTaskHour,
} from "../../services/taskServices";
import styles from "./styles.module.css";
import lang from "../../lang";
const strings = lang.TaskInfo;

const TasksInfoPreview = ({ task, actions, client }) => {
  const complete = (task) => {
    completeTask(client, task);
    actions.hideWindow();
  };
  const del = (task) => {
    deleteTask(client, task);
    actions.hideWindow();
  };

  return (
    <div className={styles.wrapper}>
      <h2 style={{ textAlign: "center" }}>{task.content}</h2>
      <KeyboardNav>
        <ul className={styles.list}>
          <KeyboardNavItem>{getTaskHour(task) || null}</KeyboardNavItem>
          <KeyboardNavItem>{task.description || null}</KeyboardNavItem>
          <KeyboardNavItem>{task.projectName}</KeyboardNavItem>
          <KeyboardNavItem onSelect={() => complete(task)}>
            {strings.completeTaskButton}
          </KeyboardNavItem>
          <KeyboardNavItem onSelect={() => del(task)}>
            {strings.deleteTaskButton}
          </KeyboardNavItem>
        </ul>
      </KeyboardNav>
    </div>
  );
};

export default TasksInfoPreview;
