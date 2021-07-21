import Loading from "../cerebro-ui/Loading";
import TodayTasks from "./TodayTasks";
import Preload from "../cerebro-ui/Preload";

const PreviewToday = ({ actions, client }) => {
	let promise = client.getTodayTasksJSON();
	return (
		<Preload promise={promise} loader={Loading()}>
			{(promiseResult) => (
				<TodayTasks content={promiseResult} actions={actions} client={client} />
			)}
		</Preload>
	);
};

export default PreviewToday;
