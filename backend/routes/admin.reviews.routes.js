const express = require("express");
const ReviewModel = require("../models/Review.model");
const BRModel = require("../models/BookReview.model");

const adminReviewRouter = express.Router();

adminReviewRouter.post("/:id", async (req, res) => {
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
			console.log(new_review._id);
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

adminReviewRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const id = req.params.id;
		try {
			let book = await BRModel.find({ book: id });
			let reviews = await ReviewModel.find({
				_id: {
					$in: book[0].reviews,
				},
			});
			res.status(200).send(reviews);
		} catch (error) {
			res.status(500).send(error.message);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

adminReviewRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await BRModel.findOneAndDelete({ book: id });
		await ReviewModel.deleteMany({ book: id });
		res.status(200).send("Reviews deleted successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

adminReviewRouter.delete("/user/:id", async (req, res) => {
	const id = req.params.id;
	try {
		let rev = await ReviewModel.findByIdAndDelete(id);
		console.log(rev);
		await BRModel.findOneAndUpdate(
			{ book: rev.book },
			{ $pull: { reviews: id } },
			{ new: true }
		);
		res.status(200).send("Review deleted successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = adminReviewRouter;
