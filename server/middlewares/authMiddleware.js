const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the decoded token to the request object
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};

module.exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access Forbidden: Admins only.' });
  }
  next();
};
