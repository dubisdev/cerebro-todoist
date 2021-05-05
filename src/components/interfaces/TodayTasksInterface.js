import Loading from "../cerebro-ui/Loading";

const PluginInterface = ({ content }) => {
	if (content) {
		return (
			<div>
				<h2>Today Tasks</h2>
				{
					<ul>
						{content.map((task) => {
							return <li key={task}>{task}</li>;
						})}
					</ul>
				}
			</div>
		);
	} else return <Loading />;
};

export default PluginInterface;
