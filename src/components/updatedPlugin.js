import { KeyboardNavItem } from "./cerebro-ui";
import { setFirstUpdateStartToFalse } from "../core-engine/startPageAfterUpdate";

const updatedPlugin = ({ actions, config }) => {
	const handleClick = (action) => {
		action === "view"
			? actions.open("https://cerebro-todoist.dubis.dev/changelog")
			: null;
		setFirstUpdateStartToFalse(config);
		actions.hideWindow();
	};

	return (
		<div>
			<h1>App updated!</h1>

			<KeyboardNavItem onSelect={() => handleClick("view")}>
				View Changelog
			</KeyboardNavItem>

			<KeyboardNavItem onSelect={() => handleClick("close")}>
				Click here to hide this
			</KeyboardNavItem>
		</div>
	);
};

export default updatedPlugin;
