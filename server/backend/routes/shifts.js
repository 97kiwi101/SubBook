const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');

// ... keep /available, /user/:email, and /create as they are ...

// [UPDATED] POST SHIFT TO SUB BOOK (With Reason)
router.put('/release', async (req, res) => {
    try {
        const { shiftId, reason } = req.body;
        await Shift.findByIdAndUpdate(shiftId, {
            NeedsToBeCovered: true,
            postingReason: reason || '' // Save the reason
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// [NEW] RETRACT SHIFT (Take it back)
router.put('/retract', async (req, res) => {
    try {
        const { shiftId } = req.body;
        // We set NeedsToBeCovered to false and clear the reason
        await Shift.findByIdAndUpdate(shiftId, {
            NeedsToBeCovered: false,
            postingReason: '' 
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ... keep /cover as it is ...

// Add this to ensure you have the full file structure
router.get('/available', async (req, res) => {
    try {
        const shifts = await Shift.find({ NeedsToBeCovered: true });
        res.json(shifts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/user/:email', async (req, res) => {
    try {
        const shifts = await Shift.find({ userid: req.params.email });
        res.json(shifts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        const { day, hours, location, description, jobType, userid, postedBy } = req.body;
        const newShift = new Shift({
            day, hours, location, description, jobType, userid, postedBy, NeedsToBeCovered: false
        });
        await newShift.save();
        res.json({ success: true, shift: newShift });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/cover', async (req, res) => {
    try {
        const { shiftId, userEmail } = req.body;
        await Shift.findByIdAndUpdate(shiftId, {
            userid: userEmail,
            NeedsToBeCovered: false,
            postingReason: '' // Clear reason once taken
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;