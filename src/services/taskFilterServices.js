export const filterByDate = (originalTasksObject, searchedDate) => {
	return originalTasksObject.filter(
		(task) => task.due && task.due.date === searchedDate
	);
};

export const filterByContent = (originalTasksObject, textToContain) => {
	return originalTasksObject.filter((task) =>
		task.content.toLowerCase().includes(textToContain.toLowerCase())
	);
};
