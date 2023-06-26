const express = require("express");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const BookModel = require("../models/Book.model");

const bookRouter = express.Router();

bookRouter.post("/add", upload.single("image"), async (req, res) => {
	const { name, author } = req.body;
	try {
		const result = await cloudinary.uploader.upload(req.file.path);
		let newBook = new BookModel({
			name,
			author,
			cover: result.secure_url,
		});
		await newBook.save();
		res.status(200).send({
			message: `${name} has been added to the catalogue`,
		});
	} catch (error) {
		res.status(500).send({ error });
	}
});

bookRouter.get("/", async (req, res) => {
	try {
		const books = await BookModel.find();
		res.status(200).send({ books: books });
	} catch (error) {
		res.status(500).send({ error });
	}
});

bookRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const book = await BookModel.findById(id);
		res.status(200).send({ book: book });
	} catch (error) {
		res.status(500).send({ error });
	}
});

module.exports = bookRouter;
