const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
	book: mongoose.Schema.Types.ObjectId,
	user: String,
	review: String,
});

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = ReviewModel;
