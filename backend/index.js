const express = require("express");
require("dotenv").config();
const app = express();

const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/books.routes");
const ratingRouter = require("./routes/rating.routes");
const userAuthenticate = require("./middlewares/UserAuthenicator.middleware");
const reviewRouter = require("./routes/review.routes");
const adminBookRouter = require("./routes/admin.books.routes");
const adminAuthenticate = require("./middlewares/AdminAuthenticator.middleware");
const adminReviewRouter = require("./routes/admin.reviews.routes");
const adminRatingRouter = require("./routes/admin.rating.routes");

app.use(express.json());
app.use(cors());
app.use("/rating", userAuthenticate);
app.use("/reviews", userAuthenticate);
app.use("/books/add", userAuthenticate);
app.use("/books/post", userAuthenticate);
app.use("/admin", adminAuthenticate);
app.use("/user", userRouter);
app.use("/books", bookRouter);
app.use("/rating", ratingRouter);
app.use("/reviews", reviewRouter);
app.use("/admin/books", adminBookRouter);
app.use("/admin/rating", adminRatingRouter);
app.use("/admin/review", adminReviewRouter);

app.listen(process.env.PORT, () => {
	connectDB();
	console.log("listening to the server");
});
