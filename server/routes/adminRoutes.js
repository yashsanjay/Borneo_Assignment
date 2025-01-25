const express = require('express');
const {
  getAllUsers,
  assignRole,
  getLoginHistory,
  getActivityLogs,
  updateUser,
  deleteUser,
} = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authenticate, authorizeRole(['Admin'])); // Protect all routes below this

router.get('/users', getAllUsers);
router.put('/users/:id/role', assignRole);
router.get('/login-history', getLoginHistory);
router.get('/activity-logs', getActivityLogs);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


module.exports = router;
