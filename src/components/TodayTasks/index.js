import Loading from "../cerebro-ui/Loading";
import TodayTasks from "./TodayTasks";
import Preload from "../cerebro-ui/Preload";
import lang from "../../lang";

const PreviewToday = ({ actions, client }) => {
	const strings = lang.TodayTasks;

	let promise = client.getTodayTasksJSON();
	return (
		<Preload promise={promise} loader={Loading()}>
			{(promiseResult) => {
				if (promiseResult === null) return <h3>{strings.error}</h3>;
				return (
					<TodayTasks
						content={promiseResult}
						actions={actions}
						client={client}
					/>
				);
			}}
		</Preload>
	);
};

export default PreviewToday;
