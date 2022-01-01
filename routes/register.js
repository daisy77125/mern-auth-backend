const { User, validate } = require("../models/user.model");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

// Register Route: to create a new user
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = new User(req.body);

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.json({ msg: "User created successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Duplicate email" });
  }
});

module.exports = router;
