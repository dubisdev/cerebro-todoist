/**
 * Debe devolver un array de dos posiciones= [nombre_deProyecto, textoSinProyecto]
 */
export function getTaskProject(taskText) {
	if (!taskText) return [undefined, undefined];

	//search priorities
	let project = ((taskText.match(/\B(#\w+)\b/g) || []).pop() || "").substring(
		1
	);

	//remove priority strings
	let textWOResponse = taskText.split(" ");
	textWOResponse = textWOResponse.filter((word) => word !== `#${project}`);
	textWOResponse = textWOResponse.join(" ");

	if (textWOResponse) return [project, textWOResponse];
	return [project, undefined];
}

/**
 * Debe devolver un array de dos posiciones= [prioridad, textoSinPrioridad]
 */
export function getTaskPriority(taskText) {
	if (!taskText) return [undefined, undefined];

	//search priorities
	let importance = Number(
		((taskText.match(/\B(!![0-4])\b/g) || []).pop() || "").substring(2)
	);

	//remove priority strings
	let textWOResponse = taskText.split(" ");
	textWOResponse = textWOResponse.filter((word) => word !== `!!${importance}`);
	textWOResponse = textWOResponse.join(" ");

	if (textWOResponse) return [importance, textWOResponse];
	return [importance, undefined];
}

/**
 * Devuleve un array de dos posiciones= [descripción, textoSinDescripción]
 */
export function getTaskDescription(taskText) {
	if (!taskText) return [undefined, undefined];

	//search for descriptions
	let description;
	let textWOdescription = taskText;

	let descriptionPosition = taskText.search(/\B(::)\B/);

	if (descriptionPosition !== -1) {
		description = taskText.substring(descriptionPosition + 3);
		textWOdescription = taskText.substring(0, descriptionPosition - 1);
	}

	if (!description) return [undefined, taskText];

	if (textWOdescription) return [description, textWOdescription];
	return [description, undefined];
}
