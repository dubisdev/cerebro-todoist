/**
 *Method for getting comand from all the console
 */
export function getCommand(longString) {
	return longString.split(" ")[0]; //take second word (the command)
}

/**
 *Method for getting subcomand from all the console
 */
export function getSubCommand(longString) {
	return longString.split(" ")[1]; //take second word (the command)
}

export function getSubCommandText(command) {
	let response = command.split(" "); //take first word (the command)
	response.shift();
	response.shift();
	response = response.join(" ");

	//returns undefined so the api can create a _no_content_ task
	if (response === "") return undefined;

	return response;
}

/**
 * Debe devolver un array de dos posiciones= [prioridad, textoSinPrioridad]
 */
export function getTaskPriority(taskText) {
	if (!taskText) return [undefined, undefined];

	let words = taskText.split(" ");
	let importance;
	let textWOResponse = taskText;

	//search for priorities
	words.forEach((word) => {
		if (word.startsWith("!!")) {
			let number = word.substring(2);
			if (number === "") return;
			if (0 <= number && number <= 4) {
				importance = Number.parseInt(number);
			}
		}
	});

	//remove priority strings from taskText
	textWOResponse = taskText.split(" ");
	textWOResponse = textWOResponse.filter((word) => word !== `!!${importance}`);
	textWOResponse = textWOResponse.join(" ");

	if (textWOResponse) return [importance, textWOResponse];
	return [importance, undefined];
}

/**
 * Debe devolver un array de dos posiciones= [prioridad, textoSinPrioridad]
 */
export function getTaskDescription(taskText) {
	if (!taskText) return [undefined, undefined];

	let words = taskText.split(" ");
	let description;
	let textWOdescription = taskText;

	//search for descriptions
	let startDescription = words.indexOf(`::`);
	if (startDescription === -1) return [undefined, taskText];

	description = words.slice(startDescription + 1).join(" ");
	textWOdescription = words.slice(0, startDescription).join(" ");

	if (textWOdescription) return [description, textWOdescription];
	return [description, undefined];
}
