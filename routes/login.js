const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

// Login Route
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.json({ error: "An error occured" });
  }
});

const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = router;
