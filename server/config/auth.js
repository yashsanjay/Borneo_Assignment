const jwt = require('jsonwebtoken');

module.exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
