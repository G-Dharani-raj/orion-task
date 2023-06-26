const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuthenticate = async (req, res, next) => {
	// const token = req.headers.authorization;
	let checker = req.path.split("/")[1];
	if (checker && req.method === "GET") {
		next();
	} else {
		const jwt_token = req.headers.authorization;
		if (!jwt_token) {
			res.status(401).send({ message: "Please login first" });
		} else {
			const token = jwt_token;
			if (token) {
				jwt.verify(token, process.env.JWS, (err, decoded) => {
					if (err) res.status(500).send(err);
					else if (decoded) {
						// console.log(decoded);
						req.body.user = decoded.email;
						next();
					} else {
						res.status(401).send("Please login first");
					}
				});
			} else {
				res.status(401).send("Please login first");
			}
		}
	}
};

module.exports = userAuthenticate;
