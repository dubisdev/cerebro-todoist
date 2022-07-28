import { KeyboardNavItem, KeyboardNav } from "@cerebroapp/cerebro-ui";
import { completeTask, deleteTask, getTaskHour } from "services/taskServices";
import styles from "./styles.module.css";
import lang from "lang";
const strings = lang.TaskInfo;

const ListItem = ({ children, onSelect = () => {} }) => {
  return (
    <KeyboardNavItem style={{ justifyContent: "center" }} onSelect={onSelect}>
      {children}
    </KeyboardNavItem>
  );
};

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

  const taskHour = getTaskHour(task);
  const { content, description, projectName } = task;

  return (
    <div className={styles.wrapper}>
      <h2 style={{ textAlign: "center" }}>{content}</h2>
      <KeyboardNav>
        <ul className={styles.list}>
          {taskHour && <ListItem>{taskHour}</ListItem>}
          {description && <ListItem>{description}</ListItem>}
          {projectName && (
            <ListItem onSelect={() => goToProject(task)}>
              {projectName}
            </ListItem>
          )}
          <ListItem onSelect={() => complete(task)}>
            {strings.completeTaskButton}
          </ListItem>
          <ListItem onSelect={() => del(task)}>
            {strings.deleteTaskButton}
          </ListItem>
        </ul>
      </KeyboardNav>
    </div>
  );
};

export default TasksInfoPreview;
