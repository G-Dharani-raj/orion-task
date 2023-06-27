const express = require("express");
const RatingModel = require("../models/Rating.model");

const getRatingRouter = express.Router();

getRatingRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		let book_rating = await RatingModel.find({ book: id });
		if (book_rating.length === 0) {
			res.status(200).send({ rating: 0, count: 0, total: 0, book: id });
		} else {
			res.status(200).send(book_rating[0]);
		}
	} catch (error) {
		res.status(500).send({ error });
	}
});

module.exports = getRatingRouter;
