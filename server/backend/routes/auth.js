const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); // Import bcrypt

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 2. Compare the plain password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Success! Send back user info (but NEVER the password)
            res.json({ 
                success: true, 
                user: { 
                    name: user.name, 
                    email: user.email, 
                    JobArray: user.JobArray 
                } 
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, jobTitle } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // 3. Hash the password before saving
        const saltRounds = 10; // Standard security level
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email,
            password: hashedPassword, // Save the HASH, not the plain text
            name,
            JobArray: [jobTitle || 'Staff'],
            shiftIDArray: []
        });

        await newUser.save();

        res.status(201).json({ 
            success: true, 
            user: { 
                name: newUser.name, 
                email: newUser.email, 
                JobArray: newUser.JobArray 
            } 
        });

    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;