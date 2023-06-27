const express = require("express");
const UserModel = require("../models/User.model");
const ReviewModel = require("../models/Review.model");
const adminUserRouter = express.Router();

adminUserRouter.get("/", async (req, res) => {
	try {
		let users = await UserModel.find();
		res.status(200).send({ users });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

adminUserRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await UserModel.findByIdAndDelete(id);

		res.status(200).send("User deleted successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});
module.exports = adminUserRouter;
