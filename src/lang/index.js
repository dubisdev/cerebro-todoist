import es from "./es.json";
import en from "./en.json";
import fr from "./fr.json";

//get the lang from the browser
const lang = navigator.language;

const langObject = {
	es,
	"es-ES": es,
	en,
	"en-US": en,
	fr,
	"fr-FR": fr,
};

export default langObject[lang] || en;
