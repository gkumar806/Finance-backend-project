const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware"); 

// public routes
router.post("/register", register);
router.post("/login", login);

//protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile accessed successfully",
    user: req.user
  });
});

module.exports = router; 