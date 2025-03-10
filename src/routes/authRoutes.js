const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected route example
router.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "You accessed a protected route!", user: req.user });
});

module.exports = router;
