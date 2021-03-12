const express = require("express");
const router = express.Router();
const cities = require("all-the-cities");
const { request } = require("express");
const City = require("../models/City");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}

const ImageBank = [
  "https://drive.google.com/uc?id=1cjxKtwD-gXJ-wWszuWkyEivlRe8jWOZK",
  "https://drive.google.com/uc?id=1TdhTQqkl3VoG9bQQ4LtSxVQOMuYi0X8F",
  "https://drive.google.com/uc?id=1BL9A3_DD8JLagP_TJHW1kg9TCIkRMxsg",
  "https://drive.google.com/uc?id=13qUF-QohRdOq1j5Fp5NZYghJd3Mgs0O7",
  "https://drive.google.com/uc?id=1WKh9QU-t8VYHHMr8fjtrFRWOembI8RrM",
  "https://drive.google.com/uc?id=1YSDuuRyTTAar1yr77VjDWw7CyedDEcdW",
  "https://drive.google.com/uc?id=1UGjWVGtZCdw5XgQCv2jTYsFR-IzBC41P",
  "https://drive.google.com/uc?id=156Y9fjZ4FQkk3yJC8ioebzD_-NFXC-pg",
];

//Get All US cities
//Example: /api/flights/currencies
router.get("/us", (req, res, next) => {
  const populationFilter =
    req.query.population > 0 ? req.query.population : 800000;
  const cityList = cities
    .filter((city) => city.country.match("US"))
    .filter((b) => b.population > populationFilter);
  let formattedList = [];
  if (cityList.length > 0) {
    cityList.forEach((element) => {
      const { name, country, cityId } = element;
      const city = new City({
        name,
        country,
        cityId,
        imageUrl: ImageBank[getRandomInt(0, 8)],
      });
      formattedList.push(city);
    });
  }
  res.json(formattedList);
});
module.exports = router;
