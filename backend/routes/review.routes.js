const express = require("express");
const ReviewModel = require("../models/Review.model");
const BRModel = require("../models/BookReview.model");

const reviewRouter = express.Router();

reviewRouter.post("/post/:id", async (req, res) => {
	const id = req.params.id;
	const { review } = req.body;
	const { user } = req.headers;
	try {
		let check = await ReviewModel.find({
			$and: [{ user: user }, { book: id }],
		});
		if (check.length === 0) {
			let new_review = new ReviewModel({
				book: id,
				user: user,
				review,
			});
			await new_review.save();
			// console.log(new_review._id);
			let book_reviews = await BRModel.find({ book: id });
			if (book_reviews.length === 0) {
				let new_br = new BRModel({
					book: id,
					reviews: [new_review._id],
				});
				await new_br.save();
			} else {
				await BRModel.findOneAndUpdate(
					{ book: id },
					{ $push: { reviews: new_review._id } },
					{ new: true }
				);
			}
			res.status(200).send("Your review has been posted successfully");
		} else {
			await ReviewModel.findByIdAndUpdate(check[0]._id, { review });
			res.status(200).send("Your review has been updated successfully");
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

reviewRouter.get("/book/:id", async (req, res) => {
	const id = req.params.id;
	try {
		let book = await BRModel.find({ book: id });
		let reviews = await ReviewModel.find({
			_id: {
				$in: book[0].reviews,
			},
		});
		if (reviews.length > 0) {
			res.status(200).send(reviews);
		} else {
			res.status(404).send([]);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

reviewRouter.get("/user", async (req, res) => {
	const id = req.params.id;
	const { user } = req.headers;
	try {
		let user_reviews = await ReviewModel.find({ user });
		res.status(200).send(user_reviews);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

reviewRouter.get("/user/:id", async (req, res) => {
	const id = req.params.id;
	const { user } = req.headers;
	try {
		let user_reviews = await ReviewModel.find({
			$and: [{ user: user }, { book: id }],
		});
		res.status(200).send(user_reviews);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

reviewRouter.delete("/user/:id", async (req, res) => {
	const id = req.params.id;
	const { user } = req.headers;
	try {
		let user_review = await ReviewModel.findOneAndDelete({
			$and: [{ user: user }, { book: id }],
		});
		let book_review = await BRModel.findOneAndUpdate(
			{ book: id },
			{ $pull: { reviews: user_review._id } },
			{ new: true }
		);

		res.status(200).send("Your review has been deleted.");
	} catch (error) {
		res.status(500).send(error.message);
	}
});
module.exports = reviewRouter;
