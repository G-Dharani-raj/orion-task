const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/User.model");
const BookModel = require("../models/Book.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
	const { name, email, password } = req.body;

	try {
		let user = await UserModel.find({ email });
		if (user.length > 0) {
			res.status(403).send({
				message: "User already exists",
			});
		} else {
			bcrypt.hash(
				password,
				parseInt(process.env.SR),
				async (err, hash) => {
					if (err) res.status(500).send(err);
					else {
						const user = new UserModel({
							...req.body,
							password: hash,
						});
						await user.save();
						res.status(201).send({
							message: `${name} has been registered successfully`,
						});
					}
				}
			);
		}
	} catch (error) {
		res.status(400).send({ error });
	}
});

userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await UserModel.find({ email });
		if (user.length > 0) {
			bcrypt.compare(password, user[0].password, (err, result) => {
				if (err) res.status(500).send(err);
				else if (result) {
					const token = jwt.sign(
						{ email: user[0].email },
						process.env.JWS
					);

					res.status(200).send({
						token: token,
						id: user[0]._id,
					});
				} else {
					res.status(401).send({
						message: "Invalid password",
					});
				}
			});
		} else {
			res.status(401).send({ message: "Invalid credentials" });
		}
	} catch (error) {
		res.status(400).send({ error });
	}
});

userRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		let user = await UserModel.findById(id);
		let library = await BookModel.find({
			_id: {
				$in: user.library,
			},
		});
		res.status(200).send({ library });
	} catch (error) {
		res.status(500).send(error.message);
	}
});
module.exports = userRouter;
