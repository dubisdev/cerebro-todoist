import React from "react";

const TodayTasks = ({ content }) => {
	if (content) {
		return (
			<div>
				{content.map((task) => {
					return <p key={task}>{task}</p>;
				})}
			</div>
		);
	}

	return <div>Todoist Workflow Command with functions</div>;
};

export default TodayTasks;
