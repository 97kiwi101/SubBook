const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');
const User = require('../models/User');

// 1. GET ALL AVAILABLE SHIFTS (Sub Book)
router.get('/available', async (req, res) => {
    try {
        const shifts = await Shift.find({ NeedsToBeCovered: true }).lean();
        
        for (const shift of shifts) {
            const user = await User.findOne({ email: shift.userid });
            shift.posterName = user ? user.name : shift.userid; 
        }

        res.json(shifts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET MY SHIFTS (This is the one likely missing!)
router.get('/user/:email', async (req, res) => {
    try {

        const shifts = await Shift.find({ userid: req.params.email });
        res.json(shifts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. CREATE SHIFT (Admin/Test)
router.post('/create', async (req, res) => {
    try {
        const { day, hours, location, description, jobType, userid, postedBy } = req.body;
        
        const newShift = new Shift({
            day, hours, location, description, jobType, userid, postedBy, NeedsToBeCovered: false
        });
        await newShift.save();

        await User.findOneAndUpdate(
            { email: userid }, 
            { $push: { shiftIDArray: newShift._id } }
        );

        res.json({ success: true, shift: newShift });
    } catch (err) {
        console.error("Create Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// 4. RELEASE SHIFT (Post to Sub Book)
router.put('/release', async (req, res) => {
    try {
        const { shiftId, reason } = req.body;
        await Shift.findByIdAndUpdate(shiftId, {
            NeedsToBeCovered: true,
            postingReason: reason || ''
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. RETRACT SHIFT (Take Back)
router.put('/retract', async (req, res) => {
    try {
        const { shiftId } = req.body;
        await Shift.findByIdAndUpdate(shiftId, {
            NeedsToBeCovered: false,
            postingReason: ''
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. COVER SHIFT (Transfer Ownership)
router.put('/cover', async (req, res) => {
    try {
        const { shiftId, userEmail } = req.body;

        const shift = await Shift.findById(shiftId);
        if (!shift) return res.status(404).json({ error: "Shift not found" });

        const oldOwnerEmail = shift.userid;
        const newOwnerEmail = userEmail;

        // Sync: Remove from Old User
        await User.findOneAndUpdate(
            { email: oldOwnerEmail },
            { $pull: { shiftIDArray: shift._id } }
        );

        // Sync: Add to New User
        await User.findOneAndUpdate(
            { email: newOwnerEmail },
            { $push: { shiftIDArray: shift._id } }
        );

        // Update Shift
        shift.userid = newOwnerEmail;
        shift.NeedsToBeCovered = false;
        shift.postingReason = '';
        await shift.save();

        res.json({ success: true });
    } catch (err) {
        console.error("Cover Error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;