const express = require("express");
const URModel = require("../models/UserRating.model");
const RatingModel = require("../models/Rating.model");
const ratingRouter = express.Router();

ratingRouter.post("/:id", async (req, res) => {
	const id = req.params.id;
	const { rating } = req.body;
	const { user } = req.headers;
	try {
		let check = await URModel.find({
			$and: [{ user: user }, { book: id }],
		});
		if (check.length === 0) {
			let prev = await RatingModel.find({ book: id });
			let new_ur = new URModel({
				user,
				book: id,
				rating,
			});
			if (prev.length === 0) {
				let newR = new RatingModel({
					book: id,
					rating: rating,
					total: rating,
					count: 1,
				});

				await newR.save();
			} else {
				let prev_total = prev[0].total;
				let prev_count = prev[0].count;
				let new_count = prev_count + 1;
				let new_total = prev_total + rating;
				let new_rating = parseFloat((new_total / new_count).toFixed(1));
				await RatingModel.findByIdAndUpdate(prev[0]._id, {
					rating: new_rating,
					total: new_total,
					count: new_count,
				});
			}
			await new_ur.save();
			res.status(200).send({
				message: "You have successfully posted your rating.",
			});
		} else {
			let prev = await RatingModel.find({ book: id });
			let prev_ur = check[0].rating;
			let prev_total = prev[0].total;
			let prev_count = prev[0].count;
			let new_total = prev_total + rating - prev_ur;
			let new_rating = parseFloat((new_total / prev_count).toFixed(1));
			await RatingModel.findByIdAndUpdate(prev[0]._id, {
				rating: new_rating,
				total: new_total,
			});
			await URModel.findByIdAndUpdate(check[0]._id, { rating: rating });
			res.status(200).send({ message: "Your rating has been updated" });
		}
	} catch (error) {
		res.status(500).send({ error });
	}
});

// ratingRouter.get("/:id", async (req, res) => {
// 	const id = req.params.id;
// 	try {
// 		let book_rating = await RatingModel.find({ book: id });
// 		if (book_rating.length === 0) {
// 			res.status(200).send({ rating: 0, count: 0, total: 0, book: id });
// 		} else {
// 			res.status(200).send(book_rating[0]);
// 		}
// 	} catch (error) {
// 		res.status(500).send({ error });
// 	}
// });

ratingRouter.get("/userrating/:id", async (req, res) => {
	const { user } = req.headers;
	const id = req.params.id;
	console.log(user, id);
	try {
		let ur = await URModel.find({
			$and: [{ user: user }, { book: id }],
		});
		res.status(200).send(ur);
	} catch (error) {
		res.status(500).send({ error });
	}
});

ratingRouter.delete("/userrating/:id", async (req, res) => {
	const { user } = req.headers;
	const id = req.params.id;
	try {
		let ur = await URModel.find({
			$and: [{ user: user }, { book: id }],
		});
		if (ur.length === 0) {
			res.status(404).send({ message: "User rating does not exist." });
		} else {
			let prev = await RatingModel.find({ book: id });
			let prev_total = prev[0].total;
			let prev_count = prev[0].count;
			let new_count = prev_count - 1;
			let new_total = prev_total - ur[0].rating;
			let new_rating = parseFloat((new_total / new_count).toFixed(1));
			await RatingModel.findByIdAndUpdate(prev[0]._id, {
				rating: new_rating,
				count: new_count,
				total: new_total,
			});
			await URModel.findByIdAndDelete(ur[0]._id);
			res.status(200).send({
				message: "Your rating has been removed successfully.",
			});
		}
	} catch (error) {
		res.status(500).send({ error });
	}
});
module.exports = ratingRouter;
