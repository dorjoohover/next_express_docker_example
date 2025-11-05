const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

async function register(req, res) {
  try {
    const { username, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.getUserByPhone(email);
    if (user) {
      res.status(500).json({ message: "Registered user" });
      return;
    }
    user = await User.createUser({
      username,
      email,
      phone,
      password: hashedPassword,
      role: 10,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByPhone(email);

    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token , created_at: new Date()});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}

async function profile(req, res) {
  try {
    const user = await User.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Cannot fetch profile" });
  }
}

module.exports = { register, login, profile };
