const express = require("express");
const router = express.Router();
const cities = require("all-the-cities");
const City = require("../models/City");
const async = require("async");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}

//Get All US cities
//Example: /api/flights/currencies
router.get("/", (req, res, next) => {
  City.find()
    .then((cities) => {
      if (cities.length == 0) {
        cities = createCities();
      }
      res.json(cities);
    })
    .catch((err) => {
      throw err;
    });
});

function createCities() {
  const populationFilter = 800000;
  const cityList = cities
    .filter((city) => city.country.match("US"))
    .filter((b) => b.population > populationFilter);
  const formattedList = [];
  async.eachLimit(
    cityList,
    10,
    (element, callback) => {
      const { name, country, cityId } = element;
      const city = new City({
        name,
        country,
        cityId,
      });
      city.save().then((createdCity) => {
        formattedList.push(createdCity);
        callback();
      }).catch(err => {
        callback(err);
      });
    },
    (err) => {
      return formattedList;
    }
  );
  return formattedList;
}

module.exports = router;
