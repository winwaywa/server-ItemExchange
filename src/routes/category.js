const express = require('express');
const router = express.Router();

const { createCategory, getAllCategories, getCategory } = require('../controllers/category');

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get('/:id', getCategory);

module.exports = router;
