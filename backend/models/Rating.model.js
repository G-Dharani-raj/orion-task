const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
	book: mongoose.Schema.Types.ObjectId,
	rating: { type: Number, default: 0 },
	total: { type: Number, default: 0 },
	count: { type: Number, default: 0 },
});

const RatingModel = mongoose.model("rating", ratingSchema);

module.exports = RatingModel;
