const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // Description of the action
    resourceType: { type: String, required: true }, // What resource was acted upon
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: false }, // Optional reference to the resource (if applicable)
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
