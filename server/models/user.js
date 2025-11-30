import mongoose from "mongoose";

//User table to determine who is logged in or not.
const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  accountTypeId: { type: Number, required: true, ref: "account" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model("User", userSchema);