const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuthenticate = async (req, res, next) => {
	// const token = req.headers.authorization;
	let checker = req.path.split("/")[1];
	// console.log(req.baseUrl);
	if (checker && req.method === "GET" && req.baseUrl === "/reviews") {
		next();
	} else {
		const jwt_token = req.headers.authorization;
		// console.log(jwt_token);
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
						req.headers.user = decoded.email;
						// console.log(req.headers);
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
