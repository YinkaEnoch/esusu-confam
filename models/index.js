import "dotenv/config";
import mongoose from "mongoose";
import User from "./user.model.js";

mongoose
  .connect(process.env.MONGO_DB_URI, {})
  .then(() => console.log("MongoDB database connection successful :)"))
  .catch((e) => console.log(e));

export { User };
