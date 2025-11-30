import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";
import bcrypt from "bcrypt"; //Using bcrypt for password hashing

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // To avoid issues, I chose to clear the table first before adding any new data.
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("password", 10); //Hashing the password

    //Keeping the users to just one for now, may add more later.
    const users = [
      { userId: 1, accountTypeId: 3, firstName: "Logan", lastName: "MacConnell", email: "test@email.com", password: hashedPassword }
    ];

    await User.insertMany(users);
    console.log("Accounts seeded successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
};

seedUsers();