import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { notifyAdminNewUser } from "../utils/mailer.js";

const router = express.Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

router.post("/", async (req, res) => {
  try {
    const { organizationName, userName, workEmail, password, country } =
      req.body;

    if (!organizationName || !userName || !workEmail || !password || !country) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (!isValidEmail(workEmail)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    // if (password.length < 8) {
    //   return res
    //     .status(400)
    //     .json({ message: "Password must be at least 8 characters." });
    // }

    const existing = await User.findOne({ workEmail: workEmail.toLowerCase() });
    if (existing) {
      return res
        .status(409)
        .json({ message: "User already exists with this email." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      organizationName,
      userName,
      workEmail: workEmail.toLowerCase(),
      passwordHash,
      country,
    });

    // Notify admin (don’t fail the signup if mail fails)
    notifyAdminNewUser({
      organizationName,
      userName,
      workEmail,
      country,
    }).catch((e) => console.error("Mail error:", e.message));

    return res.status(201).json({
      message: "Invite saved successfully.",
      userId: user._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
});

export default router;
