/** @format */

const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const rapidApiKey = process.env.RAPID_API_KEY;
const rapidApiHost = process.env.RAPID_API_HOST;
const validator = require("validator");

//rapid API appears to limit all results up to 10

const dateInPast = (date1, date2 = new Date()) => {
	if (typeof date2 === "string") {
		const splitDate2 = date2.split("-");
		date2 = new Date(splitDate2[0], splitDate2[1] - 1, splitDate2[2]);
	} else {
		const year = date2.getFullYear();
		const month = date2.getMonth();
		const day = date2.getDate();
		date2 = new Date(year, month, day);
	}
	const splitDate1 = date1.split("-");
	date1 = new Date(splitDate1[0], splitDate1[1] - 1, splitDate1[2]);
	return date1 < date2;
};

router.get("/quotes/:from/:to/:outboundDate", (req, res, next) => {
	const { from, to, outboundDate } = req.params;
	const { inboundDate } = req.query;
	// check date format
	const validatorOptions = { format: "YYYY-MM-DD", strictMode: true };
	const outDate = validator.isDate(outboundDate, validatorOptions)
		? outboundDate
		: "";
	const inDate = validator.isDate(inboundDate, validatorOptions)
		? inboundDate
		: "";
	// test for errors
	const errors = {};
	const origin = from.includes("-sky")
		? from
		: (errors.from = "Invalid format or missing value.");
	const destination = to.includes("-sky")
		? to
		: (errors.to = "Invalid format or missing value.");
	const departDate = outDate
		? !dateInPast(outDate)
			? outboundDate
			: (errors.outboundDate = "Departure date is a past date.")
		: (errors.outboundDate = "Invalid date format.");

	if (Object.keys(errors).length === 0) {
		const request = unirest.get(
			`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${origin}/${destination}/${departDate}`
		);
		request.headers({
			"x-rapidapi-key": rapidApiKey,
			"x-rapidapi-host": rapidApiHost,
			useQueryString: true,
		});
		// API does not return results for inboundDate
		if (inboundDate) {
			const returnDate = inDate
				? !dateInPast(inDate, outDate)
					? inboundDate
					: ""
				: "";

			request.query({
				query: returnDate,
			});
		}
		request
			.then((response) => {
				res.json(response.body);
			})
			.catch((err) => {
				next(err);
			});
	} else {
		res.send(errors);
	}
});

router.get("/places/:regionId", (req, res, next) => {
	const { regionId } = req.params;
	// regionId can be either the full name or abbreviation of the state, same results
	const error = {};
	const region = validator.isAlpha(regionId)
		? regionId
		: (error.region = "Region not in proper format.");

	if (Object.keys(error).length === 0) {
		const request = unirest(
			"GET",
			"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/"
		);

		request.query({
			query: region,
		});

		request.headers({
			"x-rapidapi-key": rapidApiKey,
			"x-rapidapi-host": rapidApiHost,
			useQueryString: true,
		});
		request
			.then((response) => {
				res.json(response.body);
			})
			.catch((err) => {
				next(err);
			});
	} else {
		res.send(error);
	}
});

module.exports = router;
