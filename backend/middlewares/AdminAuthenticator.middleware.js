const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuthenticate = async (req, res, next) => {
	const jwt_token = req.headers.authorization;
	// console.log(jwt_token);
	if (!jwt_token) {
		res.status(401).send({ message: "Please login first" });
	} else {
		const token = jwt_token;
		// console.log(token);
		if (token) {
			jwt.verify(token, process.env.JWS, async (err, decoded) => {
				if (err) res.send(err);
				else if (decoded) {
					// console.log(decoded);
					req.body.user = decoded.email;
					req.headers.user = decoded.email;
					let user = await UserModel.find({ email: decoded.email });
					// console.log(user);
					if (user[0].admin) {
						next();
					} else {
						res.status(401).send({
							message: "Not authorized",
						});
					}
				} else {
					res.status(401).send("Please login first");
				}
			});
		} else {
			res.status(401).send("Please login first");
		}
	}
};

module.exports = adminAuthenticate;
