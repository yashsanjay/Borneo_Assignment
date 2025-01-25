const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Log = require('../models/log');

// Token generation function
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );
};

module.exports.signup = async (req, res) => {
    try {
        const { email, password, role } = req.body; // Include `role` in the destructuring
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Create a new user, allowing optional role
        const user = new User({ email, password, role }); 
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = generateToken(user);

        // Log the login attempt
        await Log.create({
            userId: user._id,
            ip: req.ip, // Client's IP address
            device: req.headers['user-agent'], // Client's device info
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};