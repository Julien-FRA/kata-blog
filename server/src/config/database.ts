import mongoose from "mongoose";

const connectDB = async () => {
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
};

export default connectDB;
