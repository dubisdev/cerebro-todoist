import Loading from "./Loading";

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
	} else return <Loading />;
};

export default TodayTasks;
