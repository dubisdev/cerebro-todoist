import { getSubCommandText } from "cerebro-command-router";
import { completeTask } from "./taskServices";
import pDebounce from "p-debounce";
import { TaskInfo } from "../components";

import lang from "../lang";
import { APITaskObject, TDSClient } from "todoist-rest-client/dist/definitions";
const strings = lang.displayArrayGenerator;
import { CerebroScreen } from "cerebro-command-router/dist/definitions";

type Options = {
  type?: "today" | "view";
  client: TDSClient;
  term: string;
  actions: object;
  showOverdue?: boolean;
};

const ItaskArrayGenerator = (opts: Options) => {
  const { type } = opts;
  switch (type) {
    case "today":
      return todayTaskArrayGenerator(opts);
    case "view":
      return filterTaskArrayGenerator(opts);
    default:
      return todayTaskArrayGenerator(opts);
  }
};

type tTAG = (opts: Options) => Promise<CerebroScreen[]>;
const todayTaskArrayGenerator: tTAG = async ({
  client,
  showOverdue,
  term,
  actions,
}) => {
  let taskArray: APITaskObject[];

  const contentSearch = getSubCommandText(term);
  let filter = contentSearch
    ? `(today | overdue) & search:${contentSearch}`
    : `today | overdue`;

  try {
    taskArray = showOverdue
      ? await client.task.search({ filter })
      : await client.extras.getTodayTaskJSON();
  } catch (err) {
    return handleErrors(err);
  }

  if (taskArray.length === 0) {
    if (contentSearch) return [{ title: strings.noFilteredTasksFound }];
    else return [{ title: strings.noTodayTasks }];
  }

  // API restrictions - only call <= 10 times
  if (taskArray.length <= 10) {
    taskArray = await Promise.all(
      taskArray.map(async (task) => {
        let projectName = (await client.project.get(task.project_id)).name;
        return { ...task, projectName };
      })
    );
  }

  return taskArray.map((task) => {
    return {
      title: task.content,
      onSelect: () => completeTask(client, task),
      getPreview: () => (
        <TaskInfo task={task} client={client} actions={actions} />
      ),
    };
  });
};

const filterTaskArrayGenerator = async ({ client, term, actions }: Options) => {
  const filter = getSubCommandText(term);

  if (!filter) return Promise.resolve([{ title: strings.noFilterFound }]);

  let fullTasksList: APITaskObject[];

  try {
    fullTasksList = await client.task.search({ filter });
  } catch (err) {
    return handleErrors(err);
  }

  if (fullTasksList.length === 0)
    return [{ title: strings.noFilteredTasksFound }];

  if (fullTasksList.length <= 10) {
    fullTasksList = await Promise.all(
      fullTasksList.map(async (task) => {
        let projectName = (await client.project.get(task.project_id)).name;
        return { ...task, projectName };
      })
    );
  }

  return fullTasksList.map((task) => ({
    title: task.content,
    onSelect: () => completeTask(client, task),
    getPreview: () => (
      <TaskInfo task={task} client={client} actions={actions} />
    ),
  }));
};

const handleErrors = (err) => {
  if (err?.response?.data?.includes("filter")) {
    return [{ title: strings.filterError }];
  }

  return [{ title: lang.TaskInfo.error }];
};

const debouncedTaskArrayGenerator = pDebounce(ItaskArrayGenerator, 275);

export default debouncedTaskArrayGenerator;
