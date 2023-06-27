const express = require("express");
const RatingModel = require("../models/Rating.model");
const URModel = require("../models/UserRating.model");

const adminRatingRouter = express.Router();

adminRatingRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		let book_rating = await RatingModel.find({ book: id });
		if (book_rating.length === 0) {
			res.status(200).send({ rating: 0, count: 0, total: 0, book: id });
		} else {
			res.status(200).send(book_rating[0]);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

adminRatingRouter.post("/:id", async (req, res) => {
	const id = req.params.id;
	const { rating, count, total } = req.body;
	try {
		let new_rating = new RatingModel({
			book: id,
			rating,
			count,
			total,
		});
		await new_rating.save();
		res.status(200).send("Rating Posted successfully.");
	} catch (error) {
		res.status(500).send(error.message);
	}
});
adminRatingRouter.patch("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await RatingModel.findOneAndUpdate({ book: id }, { ...req.body });
		res.status(200).send("Rating updated successfully.");
	} catch (error) {
		res.status(500).send(error.message);
	}
});
adminRatingRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await RatingModel.findOneAndDelete({ book: id });
		await URModel.deleteMany({ book: id });
		res.status(200).send("Rating deleted successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = adminRatingRouter;
