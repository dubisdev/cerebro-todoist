export function getSubCommandText(command) {
	let response = command.split(" "); //take first word (the command)
	response.shift();
	response.shift();
	response = response.join(" ");

	//returns undefined so the api can create a _no_content_ task
	if (response === "") return undefined;

	return response;
}
