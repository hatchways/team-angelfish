const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const rapidApiKey = "b45bedc57emsh23d534a09704e52p1ab1a8jsn764974156db7";
const rapidApiHost = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com";

//Get All available currencies
router.get("/currencies", (req, res, next) => {
  const unirestreq = unirest(
    "GET",
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies"
  );

  unirestreq.headers({
    "x-rapidapi-key": rapidApiKey,
    "x-rapidapi-host": rapidApiHost,
    useQueryString: true,
  });

  unirestreq.end(function (response) {
    if (!response || response.error) throw new Error(response.error);
    res.send(response.body);
    console.log(response.body);
  });
});

//Get All available places
router.get(
  "/places/:country/:countryCode/:currency/:locale",
  (req, res, next) => {
    const params = req.params;
    const unirestreq = unirest(
      "GET",
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${params.countryCode}/${params.currency}/${params.locale}/`
    );

    unirestreq.query({
      query: params.country,
    });

    unirestreq.headers({
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": rapidApiHost,
      useQueryString: true,
    });

    unirestreq.end(function (response) {
      if (!response || response.error) throw new Error(response.error);
      res.send(response.body);
      console.log(response.body);
    });
  }
);

module.exports = router;
