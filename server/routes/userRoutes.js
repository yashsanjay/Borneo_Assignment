const express = require('express');
const { getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Middleware to ensure authentication
router.use(authenticate);

// Get a user by ID
router.get('/:id', getUserById);

// Update user details
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;
