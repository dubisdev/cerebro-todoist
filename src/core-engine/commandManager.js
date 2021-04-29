/**
 *Method for getting subcomand from all the console
 */
export function getSubCommand(longString) {
	let all = longString;
	//change replaceAll working form
	String.prototype.replaceAll = function (strReplace, strWith) {
		var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
		var reg = new RegExp(esc, "ig");
		return this.replace(reg, strWith);
	};

	all = all.replaceAll("Todoist Workflow", "");
	all = all.replaceAll("tds", "");
	all = all.replaceAll("tds ", "");
	all = all.replaceAll("Todoist Workflow ", "");
	all = all.split(" ")[1]; //take first word (the command)

	return all;
}
