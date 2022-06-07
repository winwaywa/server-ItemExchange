const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const {
    openConversation,
    getConversationsByUser,
    closeConversations,
} = require('../controllers/coversation');

router
    .route('/')
    .get(authenticateUser, getConversationsByUser)
    .post(openConversation)
    .put(closeConversations);

module.exports = router;
