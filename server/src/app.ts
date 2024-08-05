import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/database";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

connectDB();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Auth route
const AuthRoute = require("./routes/Auth");
app.use("/auth", AuthRoute);

// User route
const UserRoute = require("./routes/User");
app.use("/user", UserRoute);

// Article route
const ArticleRoute = require("./routes/Articles");
app.use("/article", ArticleRoute);

// Notice route
const NoticeRoute = require("./routes/Notice");
app.use("/notice", NoticeRoute);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
