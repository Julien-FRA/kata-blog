import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT;

const UserRoute = require("./routes/User");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("Hello blog application!");
});

app.use("/user", UserRoute);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
