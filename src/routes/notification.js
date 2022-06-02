const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const {
    getNotificationsByUser,
    createNotification,
    updateNotification,
} = require('../controllers/notification');

router.route('/').get(authenticateUser, getNotificationsByUser).post(createNotification);
router.route('/:id').put(updateNotification);

module.exports = router;
