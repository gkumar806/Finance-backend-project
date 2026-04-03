const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//To Generate Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};


// For Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // to check Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    // check if user exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // to create user
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "viewer",
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// To LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // to  Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    // check user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // to compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id, user.role),
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};