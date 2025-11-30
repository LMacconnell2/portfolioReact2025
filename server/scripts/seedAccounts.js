import mongoose from "mongoose";
import dotenv from "dotenv";
import Account from "../models/account.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedAccounts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // To avoid issues, I chose to clear the table first before adding any new data.
    await Account.deleteMany({});

    //Keeping the account types simple for now, may add more user types later.
    const accounts = [
      { accountTypeId: 1, accountTypeName: "admin" },
      { accountTypeId: 2, accountTypeName: "editor" },
      { accountTypeId: 3, accountTypeName: "user" },
    ];

    await Account.insertMany(accounts);
    console.log("Accounts seeded successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding accounts:", err);
    process.exit(1);
  }
};

seedAccounts();