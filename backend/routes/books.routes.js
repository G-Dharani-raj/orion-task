const express = require("express");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const BookModel = require("../models/Book.model");
const UserModel = require("../models/User.model");

const bookRouter = express.Router();

bookRouter.post("/add", upload.single("image"), async (req, res) => {
	const { name, author } = req.body;
	const { user } = req.headers;
	console.log(user);
	try {
		const result = await cloudinary.uploader.upload(req.file.path);
		let newBook = new BookModel({
			...req.body,
			cover: result.secure_url,
			uploadedBy: user,
		});
		await newBook.save();
		await UserModel.findOneAndUpdate(
			{ email: user },
			{ $push: { library: newBook._id } },
			{ new: true }
		);
		res.status(200).send({
			message: `${name} by ${author} has been added to the catalogue.`,
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

bookRouter.post("/post/:id", async (req, res) => {
	const id = req.params.id;
	const { user } = req.headers;
	console.log(user);
	try {
		await UserModel.findOneAndUpdate(
			{ email: user },
			{ $push: { library: id } },
			{ new: true }
		);
		res.status(200).send("Added to library");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = bookRouter;
