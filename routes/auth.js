const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const rounds = 10

// User Model
const User = require('../models/user');

// Add a new User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {

        // Require User Email
        if (!email) res.status(500).json({ error: 'Email Required' })
        else {
            // Check if the Email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'This User already exists' });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, rounds);

        // Create a New User
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save User to the DB
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login user and generate JWT token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No User with that Email found' });
        }

        // Check Password
        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, 'secretkey');

        return res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
