import { KeyboardNavItem } from "./cerebro-ui";
import { setFirstUpdateStartToFalse } from "../core-engine/startPageAfterUpdate";
import lang from "../lang";
const strings = lang.afterUpdate;

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
			<h1>{strings.pluginUpdated}</h1>

			<KeyboardNavItem onSelect={() => handleClick("view")}>
				{strings.viewChangelog}
			</KeyboardNavItem>

			<KeyboardNavItem onSelect={() => handleClick("close")}>
				{strings.clickToHideWindow}
			</KeyboardNavItem>
		</div>
	);
};

export default updatedPlugin;
