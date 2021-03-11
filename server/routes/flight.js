/** @format */

const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const rapidApiKey = process.env.RAPID_API_KEY;
const rapidApiHost = process.env.RAPID_API_HOST;

//Get All available currencies
//Example: /api/flights/currencies
// router.get("/currencies", (req, res, next) => {
// 	unirest
// 		.get(
// 			"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies"
// 		)
// 		.headers({
// 			"x-rapidapi-key": rapidApiKey,
// 			"x-rapidapi-host": rapidApiHost,
// 			useQueryString: true,
// 		})
// 		.then((response) => {
// 			res.send(response.body);
// 		})
// 		.catch((err) => {
// 			next(err);
// 		});
// });

// //Get All available places
// //Example : /api/flights/places/france/fr/eur/fr.eu/
// router.get(
// 	"/places/:country/:countryCode/:currency/:locale",
// 	(req, res, next) => {
// 		const { country, countryCode, currency, locale } = req.params;
// 		unirest
// 			.get(
// 				`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${countryCode}/${currency}/${locale}/`
// 			)
// 			.headers({
// 				"x-rapidapi-key": rapidApiKey,
// 				"x-rapidapi-host": rapidApiHost,
// 				useQueryString: true,
// 			})
// 			.query({
// 				query: country,
// 			})
// 			.then((response) => {
// 				res.send(response.body);
// 			})
// 			.catch((err) => {
// 				next(err);
// 			});
// 	}
// );

// //Retrieve the cheapest quotes from our cache prices.
// //Example : /api/flights/quotes/US/USD/en-US/SFO-sky/JFK-sky/2021-03-12
// //Example : /api/flights/quotes/US/USD/en-US/SFO-sky/JFK-sky/2021-03-12?inboundPartialDate=2021-03-21
// router.get(
// 	"/quotes/:marketCountry/:currency/:local/:originPlace/:destinationPlace/:outboundPartialDate",
// 	(req, res, next) => {
// 		const {
// 			marketCountry,
// 			currency,
// 			locale,
// 			originPlace,
// 			destinationPlace,
// 			outboundPartialDate,
// 		} = req.params;
// 		const request = unirest.get(
// 			`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${marketCountry}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}`
// 		);
// 		request.headers({
// 			"x-rapidapi-key": rapidApiKey,
// 			"x-rapidapi-host": rapidApiHost,
// 			useQueryString: true,
// 		});
// 		//@Note: There is no validation on inboundPartialDate for this endpoint
// 		if (req.query.inboundPartialDate) {
// 			request.query({
// 				query: req.query.inboundPartialDate,
// 			});
// 		}
// 		request
// 			.then((response) => {
// 				res.send(response.body);
// 			})
// 			.catch((err) => {
// 				next(err);
// 			});
// 	}
// );

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
			"x-rapidapi-key": "3031e33fd9msh3c73fd1d3122a19p1a03abjsn0397c5598162",
			"x-rapidapi-host":
				"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			useQueryString: true,
		});

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


module.exports = router;
