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

  const goToProject = (task) => {
    actions.replaceTerm("tds view ##" + task.projectName);
  };

  return (
    <div className={styles.wrapper}>
      <h2 style={{ textAlign: "center" }}>{task.content}</h2>
      <KeyboardNav>
        <ul className={styles.list}>
          <KeyboardNavItem>{getTaskHour(task)}</KeyboardNavItem>
          <KeyboardNavItem>{task.description}</KeyboardNavItem>
          <KeyboardNavItem onSelect={() => goToProject(task)}>
            {task.projectName}
          </KeyboardNavItem>
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
