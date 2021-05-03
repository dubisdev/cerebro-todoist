import React from "react";

const TodayTasks = ({ content }) => {
	if (content) {
		return (
			<div>
				<h2>Today Tasks</h2>
				<ul>
					{content.map((task) => {
						return <li key={task}>{task}</li>;
					})}
				</ul>
			</div>
		);
	}

	return <div>Todoist Workflow Command with functions</div>;
};

export default TodayTasks;
