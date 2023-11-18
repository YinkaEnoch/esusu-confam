import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    groups: [String],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltNo = parseInt(process.env.SALT) || 10;
    const salt = await bcrypt.genSalt(saltNo);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", UserSchema);
export default User;
