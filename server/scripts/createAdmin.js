require("dotenv").config();

const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await connectDB();

    const email =
      process.env.ADMIN_EMAIL ||
      "admin@indexora.com";

    const password =
      process.env.ADMIN_PASSWORD ||
      "Admin@12345";

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      existingUser.role = "admin";

      await existingUser.save();

      console.log(
        "Existing user promoted to admin"
      );

      process.exit(0);
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.create({
      name: "Indexora Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

createAdmin();