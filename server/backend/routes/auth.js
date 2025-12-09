const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (user) {
            // Send back only the necessary fields
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
        console.error("Login Error:", err); // Log error to terminal
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

        const newUser = new User({
            email,
            password, 
            name,
            JobArray: [jobTitle || 'Staff'],
            shiftIDArray: []
        });

        await newUser.save();

        // FIX: Send a clean object, not the full database document
        res.status(201).json({ 
            success: true, 
            user: { 
                name: newUser.name, 
                email: newUser.email, 
                JobArray: newUser.JobArray 
            } 
        });

    } catch (err) {
        console.error("Register Error:", err); // Log error to terminal
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;