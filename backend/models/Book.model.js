// book model
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	name: { type: String, required: true },
	author: { type: String, required: true },
	cover: { type: String, required: false },
	uploadedBy: { type: String, default: "admin" },
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
