export const filterByDate = (originalTasksObject, searchedDate) => {
	return originalTasksObject.filter(
		(task) => task.due && task.due.date === searchedDate
	);
};
