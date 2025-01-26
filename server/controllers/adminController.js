const User = require('../models/user');
const Log = require('../models/log');
const ActivityLog = require('../models/activityLog');

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'email role status');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.assignRole = async (req, res) => {
    try {
        const { role, status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { role, status }, { new: true });

        if (!user) return res.status(404).json({ error: 'User not found' });

        
        await ActivityLog.create({
            userId: req.user.id,
            action: `Assigned role ${role} to user ${user.email}`,
            resourceType: 'User',
            resourceId: user._id,
        });

        res.status(200).json({ message: 'Role updated', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.getLoginHistory = async (req, res) => {
    try {
        const logs = await Log.find({}).populate('userId', 'email');
        console.log(logs);
        
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find({})
            .populate('userId', 'email')
            .sort({ timestamp: -1 });

        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
      const { email, status, role } = req.body;e
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { email, status, role },
        { new: true }
      );
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
  module.exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  