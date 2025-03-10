const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register); // ✅ Ensure this matches the Postman request
router.post("/login", login);

module.exports = router;
