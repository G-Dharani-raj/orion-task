const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
	try {
		mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to the database");
	} catch (error) {
		console.log("Something went wrong", error.message);
	}
};

module.exports = connectDB;
