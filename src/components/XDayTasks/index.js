import Loading from "../cerebro-ui/Loading";
import XDayTasks from "./XDayTasks";
import Preload from "../cerebro-ui/Preload";
import { checkDate } from "./checkDate";
import lang from "../../lang";

const PreviewXDay = ({ actions, client, dayInfo }) => {
	let strings = lang.XDayTasks;
	let promise = client.getAllJSON();

	const { isDate, dateString } = checkDate(dayInfo);

	if (isDate) {
		return (
			<Preload promise={promise} loader={Loading()}>
				{(promiseResult) => {
					if (promiseResult === null) return <h3>{strings.error}</h3>;
					return (
						<XDayTasks
							content={promiseResult.filter(
								(task) => task.due && task.due.date === dateString
							)}
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
