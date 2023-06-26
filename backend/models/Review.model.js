const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
	book: mongoose.Schema.Types.ObjectId,
	user: mongoose.Schema.Types.ObjectId,
	review: String,
});

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = ReviewModel;
