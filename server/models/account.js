import mongoose from "mongoose";

//User table to determine who is logged in or not.
const accountSchema = new mongoose.Schema({
  accountTypeId: { type: Number, required: true, unique: true },
  accountTypeName: { type: String, required: true, unique: true },
});

export default mongoose.model("Account", accountSchema);