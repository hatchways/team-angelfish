const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const rapidApiKey = "b45bedc57emsh23d534a09704e52p1ab1a8jsn764974156db7";
const rapidApiHost = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com";

//Get All available currencies
//Example: http://localhost:3001/api/flights/currencies
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
//Example : http://localhost:3001/api/flights/places/france/fr/eur/fr.eu/
router.get(
  "/places/:country/:countryCode/:currency/:locale",
  (req, res, next) => {
    const params = req.params;
    unirest
      .get(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${params.countryCode}/${params.currency}/${params.locale}/`
      )
      .headers({
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": rapidApiHost,
        useQueryString: true,
      })
      .query({
        query: params.country,
      })
      .then((response) => {
        res.send(response.body);
      })
      .catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
