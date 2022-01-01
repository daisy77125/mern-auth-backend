const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Successfully Connected…");
    })
    .catch((err) => console.log("could not connect to MongoDB", err));
};
