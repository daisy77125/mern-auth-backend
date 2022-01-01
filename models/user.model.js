const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  { collection: "user-data" }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
  return token;
};

const User = mongoose.model("UserData", userSchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = { User, validate };
