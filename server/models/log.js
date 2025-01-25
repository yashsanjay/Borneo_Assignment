const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    ip: String,
    device: String,
});

module.exports = mongoose.model('Log', logSchema);
