/** @format */

const express = require("express");
const router = express.Router();
const Itinerary = require("../models/Itinerary");

router.get("/itinerary/:id", (req, res) => {
	const { id } = req.params;
	Itinerary.find({ user: id })
		.then((trips) => {
			res.status(200).json(trips);
		})
		.catch(() =>
			res
				.status(500)
				.json({ error: "An error has occurred with the Itinerary model!" })
		);
});

module.exports = router;
