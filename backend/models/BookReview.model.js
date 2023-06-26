const mongoose = require("mongoose");

const brSchema = mongoose.Schema({
	book: mongoose.Schema.Types.ObjectId,
	reviews: [mongoose.Schema.Types.ObjectId],
});

const BRModel = mongoose.model("bookreview", brSchema);

module.exports = BRModel;
