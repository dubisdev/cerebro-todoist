import moment from "moment";

export function checkDate(date) {
	//activate if want to use mm/dd/yyyy but the other is better because allows to search by day of the same month
	//let dateObject = new Date(date);
	let dateMomentObject = moment(date, "DD/MM/YYYY");
	let dateObject = dateMomentObject.toDate();

	let day = dateObject.getDate();
	day = day < 10 ? `0` + day : day;
	let month = dateObject.getMonth() + 1;
	month = month < 10 ? `0` + month : month;

	let year = dateObject.getFullYear();
	let dateString = `${year}-${month}-${day}`;

	return {
		isDate: dateObject instanceof Date && !isNaN(dateObject),
		dateString,
	};
}
