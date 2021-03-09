const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const rapidApiKey = process.env.RAPID_API_KEY;
const rapidApiHost = process.env.RAPID_API_HOST;

//Get All available currencies
//Example: /api/flights/currencies
router.get("/currencies", (req, res, next) => {
  unirest
    .get(
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies"
    )
    .headers({
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": rapidApiHost,
      useQueryString: true,
    })
    .then((response) => {
      res.send(response.body);
    })
    .catch((err) => {
      next(err);
    });
});

//Get All available places
//Example : /api/flights/places/france/fr/eur/fr.eu/
router.get(
  "/places/:country/:countryCode/:currency/:locale",
  (req, res, next) => {
    const { country, countryCode, currency, locale } = req.params;
    unirest
      .get(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${countryCode}/${currency}/${locale}/`
      )
      .headers({
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": rapidApiHost,
        useQueryString: true,
      })
      .query({
        query: country,
      })
      .then((response) => {
        res.send(response.body);
      })
      .catch((err) => {
        next(err);
      });
  }
);

//Retrieve the cheapest quotes from our cache prices.
//Example : /api/flights/quotes/US/USD/en-US/SFO-sky/JFK-sky/2021-03-12
//Example : /api/flights/quotes/US/USD/en-US/SFO-sky/JFK-sky/2021-03-12?inboundPartialDate=2021-03-21
router.get(
  "/quotes/:marketCountry/:currency/:local/:originPlace/:destinationPlace/:outboundPartialDate",
  (req, res, next) => {
    const {
      marketCountry,
      currency,
      locale,
      originPlace,
      destinationPlace,
      outboundPartialDate,
    } = req.params;
    const request = unirest.get(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${marketCountry}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}`
    );
    request.headers({
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": rapidApiHost,
      useQueryString: true,
    });
    //@Note: There is no validation on inboundPartialDate for this endpoint
    if (req.query.inboundPartialDate) {
      request.query({
        query: req.query.inboundPartialDate,
      });
    }
    request
      .then((response) => {
        res.send(response.body);
      })
      .catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
