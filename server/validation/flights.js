/** @format */
const validator = require("validator");

const dateInPast = (date1, date2 = new Date()) => {
	const splitDate1 = date1.split("-");
	date1 = new Date(splitDate1[0], splitDate1[1] - 1, splitDate1[2]);
	if (typeof date2 === "string") {
		const splitDate2 = date2.split("-");
		date2 = new Date(splitDate2[0], splitDate2[1] - 1, splitDate2[2]);
	} else {
		const year = date2.getFullYear();
		const month = date2.getMonth();
		const day = date2.getDate();
		date2 = new Date(year, month, day);
	}
	return date1 < date2;
};
const checkDepartDate = (date, err, key) => {
	if (dateInPast(date)) {
		return (err[key] = "This date is a past date.");
	}
	return date;
};
const checkReturnDate = (returnDate, departDate, err, key) => {
	if (dateInPast(returnDate, departDate)) {
		return (err[key] = "This date is prior to the departure date.");
	}
	return returnDate;
};
// check date format
const validatorOptions = { format: "YYYY-MM-DD", strictMode: true };
const validateDate = (date, err, key) => {
	if (!validator.isDate(date, validatorOptions)) {
		return (err[key] = "Invalid date format.");
	}
	return date;
};
// check location
const validateLocation = (location, err, key) => {
	if (validator.isAlpha(location)) {
		return location;
	}
	return (err[key] = "Invalid format.");
};

module.exports = {
	checkDepartDate,
	checkReturnDate,
	validateDate,
	validateLocation,
};
