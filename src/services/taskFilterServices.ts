import { APITaskObject } from "todoist-rest-client/dist/definitions";

export const filterByDate = (
  originalTasksObject: APITaskObject[],
  searchedDate: string
) => originalTasksObject.filter((task) => task?.due?.date === searchedDate);

export const filterByContent = (
  originalTasksObject: APITaskObject[],
  textToContain: string
) =>
  originalTasksObject.filter((task) =>
    task.content.toLowerCase().includes(textToContain.toLowerCase())
  );
