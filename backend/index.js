const express = require("express");
require("dotenv").config();
const app = express();

const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/books.routes");
const ratingRouter = require("./routes/rating.routes");
const userAuthenticate = require("./middlewares/UserAuthenicator.middleware");

app.use(express.json());
app.use(cors());
app.use("/rating", userAuthenticate);

app.use("/user", userRouter);
app.use("/books", bookRouter);
app.use("/rating", ratingRouter);

app.listen(process.env.PORT, () => {
	connectDB();
	console.log("listening to the server");
});
