import Loading from "../cerebro-ui/Loading";
import { TodayTasksInterface as TodoistInterface } from "../interfaces";
import Preload from "../cerebro-ui/Preload";
import TDSClient from "todoist-rest-client";
import { getApiToken } from "../../core-engine/settingsServices";

const PreviewToday = ({ actions }) => {
	let miCliente = new TDSClient(getApiToken());
	let promise = miCliente.getTodayTasksJSON();
	return (
		<Preload promise={promise} loader={Loading()}>
			{(promiseResult) => (
				<TodoistInterface content={promiseResult} actions={actions} />
			)}
		</Preload>
	);
};

export default PreviewToday;
