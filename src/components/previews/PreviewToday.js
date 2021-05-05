import Loading from "../cerebro-ui/Loading";
import TodoistInterface from "../interfaces/TodayTasksInterface";
import Preload from "../cerebro-ui/Preload";
import TDSClient from "todoist-rest-client";
import { getApiToken } from "../../core-engine/settingsServices";

const PreviewToday = () => {
	let miCliente = new TDSClient(getApiToken());
	let promise = miCliente.getTodayTasks();
	return (
		<Preload promise={promise} loader={Loading()}>
			{(promiseResult) => <TodoistInterface content={promiseResult} />}
		</Preload>
	);
};

export default PreviewToday;
