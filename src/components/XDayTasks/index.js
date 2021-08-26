import Loading from "../cerebro-ui/Loading";
import XDayTasks from "./XDayTasks";
import Preload from "../cerebro-ui/Preload";
import { dateGetter } from "./checkDate";
import { filterByDate } from "../../core-engine/taskFilterServices";
import lang from "../../lang";

const PreviewXDay = ({ actions, client, dayInfo }) => {
	let strings = lang.XDayTasks;
	let promise = client.getAllJSON();

	const dateString = dateGetter(dayInfo);

	if (dateString) {
		return (
			<Preload promise={promise} loader={Loading()}>
				{(promiseResult) => {
					if (promiseResult === null) return <h3>{strings.error}</h3>;
					return (
						<XDayTasks
							content={filterByDate(promiseResult, dateString)}
							actions={actions}
							client={client}
						/>
					);
				}}
			</Preload>
		);
	}

	return null;
};

export default PreviewXDay;
