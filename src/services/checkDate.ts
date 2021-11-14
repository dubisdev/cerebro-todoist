import moment from "moment";

export function dateGetter(date) {
	//activate if want to use mm/dd/yyyy but the other is better because allows to search by day of the same month
	//let dateObject = new Date(date);
	let dateMomentObject = moment.utc(date, "DD/MM/YYYY");
	let dateObject = dateMomentObject.toDate();

	let dateString: string | undefined;
	let isDate = dateObject instanceof Date && !isNaN(dateObject);
	if (isDate) dateString = dateObject.toISOString().slice(0, 10);

	return dateString;
}
