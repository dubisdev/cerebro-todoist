import es from "./es.json";
import en from "./en.json";

//get the lang from the browser
const lang = navigator.language;

const langObject = {
	es,
	en,
};

export default langObject[lang] || en;
