const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Create User (POST)
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

// Read All Users (GET)
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

// Read Single User by ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});

// Update User (PUT)
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
});

// Delete User (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});

module.exports = router;
