/**
 * Debe devolver un array de dos posiciones= [nombre_deProyecto, textoSinProyecto]
 * Devuelve el último proyecto que encuentra
 */
export function getTaskProject(taskText?: string) {
	if (!taskText) return [undefined, undefined];

	//search projects
	let project = taskText
		.match(/\B(#\w+)\b/g)
		?.pop()
		?.substring(1);

	// delete project from text
	let textWOResponse = taskText.replace(`#${project}`, "").trim();

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
		taskText
			.match(/\b(([p]|[P])[1-4])\b/g)
			?.pop()
			?.substring(1)
	);

	//remove priority string
	if (importance) {
		let textWOResponse = taskText.replace(`p${importance}`, "").trim();
		return [importance, textWOResponse];
	}

	return [undefined, taskText];
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
		description = taskText.substring(descriptionPosition + 3).trim();
		textWOdescription = taskText.substring(0, descriptionPosition - 1).trim();
	}

	// if no description return original taskText
	if (!description) return [undefined, taskText.trim()];

	if (textWOdescription) return [description, textWOdescription];
	return [description, undefined];
}
