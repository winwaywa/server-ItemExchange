const express = require('express');
const router = express.Router();

const { createMessage, getMessagesByConversation } = require('../controllers/message');

router.route('/').post(createMessage);
router.route('/:id').get(getMessagesByConversation);

module.exports = router;
