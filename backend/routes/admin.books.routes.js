const express = require("express");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const BookModel = require("../models/Book.model");
const BRModel = require("../models/BookReview.model");
const RatingModel = require("../models/Rating.model");
const URModel = require("../models/UserRating.model");
const ReviewModel = require("../models/Review.model");
const UserModel = require("../models/User.model");
const adminBookRouter = express.Router();

adminBookRouter.get("/", async (req, res) => {
	try {
		const books = await BookModel.find();
		res.status(200).send({ books: books });
	} catch (error) {
		res.status(500).send({ error });
	}
});
adminBookRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const book = await BookModel.findById(id);
		res.status(200).send({ book: book });
	} catch (error) {
		res.status(500).send({ error });
	}
});

adminBookRouter.post("/", upload.single("image"), async (req, res) => {
	const { name, author } = req.body;
	try {
		const result = await cloudinary.uploader.upload(req.file.path);
		let newBook = new BookModel({
			...req.body,
			cover: result.secure_url,
		});
		await newBook.save();
		res.status(200).send({
			message: `${name} by ${author} has been added to the catalogue.`,
		});
	} catch (error) {
		res.status(500).send({ error });
	}
});

adminBookRouter.patch("/:id", upload.single("image"), async (req, res) => {
	const { name, author } = req.body;
	const id = req.params.id;
	try {
		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path);
			await BookModel.findByIdAndUpdate(id, {
				...req.body,
				cover: result.secure_url,
			});
		} else {
			await BookModel.findByIdAndUpdate(id, { ...req.body });
		}
		res.status(200).send("Book details updated successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

adminBookRouter.delete("/:id", async (req, res) => {
	try {
		await BookModel.findByIdAndDelete(req.params.id);
		await BRModel.findOneAndDelete({ book: req.params.id });
		await RatingModel.findOneAndDelete({ book: req.params.id });
		await URModel.deleteMany({ book: req.params.id });
		await ReviewModel.deleteMany({ book: req.params.id });
		await UserModel.updateMany(
			{ library: req.params.id },
			{ $pull: { library: req.params.id } },
			{ new: true }
		);
		res.status(200).send("Book deleted successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = adminBookRouter;
