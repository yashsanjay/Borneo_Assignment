const User = require('../models/user');

/**
 * Get user details by ID
 */
module.exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, 'email role status');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Update user profile (e.g., email, status)
 */
module.exports.updateUser = async (req, res) => {
    try {
        const { email, status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { email, status }, { new: true });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Delete a user (optional, depending on requirements)
 */
module.exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
