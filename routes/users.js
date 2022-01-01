const { User, validate } = require("../models/user.model");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "An error occured" });
  }
});

module.exports = router;
