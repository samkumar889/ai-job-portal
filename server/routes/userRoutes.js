
const express = require('express');
const { updateProfile, getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.put('/update', protect, updateProfile);
router.get('/:id', protect, getUserById);

module.exports = router;
