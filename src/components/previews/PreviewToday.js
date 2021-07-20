import Loading from "../cerebro-ui/Loading";
import { TodayTasksInterface as TodoistInterface } from "../interfaces";
import Preload from "../cerebro-ui/Preload";

const PreviewToday = ({ actions, client }) => {
	let promise = client.getTodayTasksJSON();
	return (
		<Preload promise={promise} loader={Loading()}>
			{(promiseResult) => (
				<TodoistInterface
					content={promiseResult}
					actions={actions}
					client={client}
				/>
			)}
		</Preload>
	);
};

export default PreviewToday;
