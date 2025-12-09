const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
    day: { type: String, required: true },
    hours: { type: String, required: true },
    location: { type: String, default: 'Main Desk' },
    description: { type: String, default: '' },
    jobType: { type: String, default: 'Monitor' }, // Default to Monitor
    
    // NEW: Store the reason why they can't work
    postingReason: { type: String, default: '' },

    postedBy: String,
    userid: String,
    NeedsToBeCovered: { type: Boolean, default: false }
});

module.exports = mongoose.model('Shift', ShiftSchema);