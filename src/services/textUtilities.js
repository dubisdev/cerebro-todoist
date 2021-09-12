/**
 * Debe devolver un array de dos posiciones= [prioridad, textoSinPrioridad]
 */
export function getTaskPriority(taskText) {
	if (!taskText) return [undefined, undefined];

	let words = taskText.split(" ");
	let importance;
	let textWOResponse = taskText;

	//search priorities
	words.forEach((word) => {
		if (word.startsWith("!!")) {
			let number = word.substring(2);
			if (number === "") return;
			if (0 <= number && number <= 4) {
				importance = Number.parseInt(number);
			}
		}
	});

	//remove priority strings
	textWOResponse = taskText.split(" ");
	textWOResponse = textWOResponse.filter((word) => word !== `!!${importance}`);
	textWOResponse = textWOResponse.join(" ");

	if (textWOResponse) return [importance, textWOResponse];
	return [importance, undefined];
}

/**
 * Devuleve un array de dos posiciones= [prioridad, textoSinPrioridad]
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
