const mongoose = require("mongoose");

const urSchema = mongoose.Schema({
	user: String,
	book: mongoose.Schema.Types.ObjectId,
	rating: Number,
});

const URModel = mongoose.model("userrating", urSchema);

module.exports = URModel;
