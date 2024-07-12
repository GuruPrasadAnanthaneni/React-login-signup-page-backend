const express = require("express");
const router = express.Router();
const User = require("../schema/schema");
const bcrypt = require("bcrypt");

router.post("/create", async (req, res) => {
  const { name, email, password, verified } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json("Email already exists.");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verified,
    });
    await newUser.save();
    res.status(200).json("Successful");
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (passwordMatch) {
        if (existingUser.verified) {
          return res.status(200).json("Login Successful!!");
        } else {
          return res.status(403).json("User not verified!!");
        }
      } else {
        return res.status(401).json("Incorrect email or password!!");
      }
    } else {
      return res.status(401).json("Incorrect email or password!!");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(200).json("Email already exists.");
    } else {
      return res.status(400).json("Email does not exist!");
    }
  } catch (error) {
    return res.status(500).json("An error occurred.");
  }
});

router.post("/reset-password", async (req, res) => {
  const { email,password } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingEmail.password=hashedPassword;
      await existingEmail.save();
      return res.status(200).json("New password created.");
    } else {
      return res.status(400).json("New not password created!");
    }
  } catch (error) {
    return res.status(500).json("An error occurred.");
  }
});



module.exports = router;