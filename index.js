require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const connectToDb = require("./db");
const { User, validate } = require("./models/user.model");
const register = require("./routes/register");
const login = require("./routes/login");
const users = require("./routes/users");

const app = express();
connectToDb();

app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/register", register);
app.use("/api/users", users);
app.use("/api/login", login);

app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "process.env.JWTPRIVATEKEY");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "process.env.JWTPRIVATEKEY");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
