const express = require("express");
require("dotenv").config();
const app = express();

const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/books.routes");

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT, () => {
	connectDB();
	console.log("listening to the server");
});
