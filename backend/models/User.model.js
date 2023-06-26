// user model
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		library: [mongoose.Schema.Types.ObjectId],
		admin: { type: Boolean, default: false },
	},
	{ versionKey: false }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
