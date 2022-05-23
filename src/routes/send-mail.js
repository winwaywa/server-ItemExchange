const express = require('express');
const router = express.Router();

const { sendMailNotification } = require('../controllers/send-mail');

router.route('/notification').post(sendMailNotification);

module.exports = router;
