const express = require('express');
const router = express.Router();

const { getAllDelivery, createDelivery } = require('../controllers/delivery');

router.route('/').get(getAllDelivery).post(createDelivery);

module.exports = router;
