const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const {
    getAllProducts,
    getProductsByUser,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/product');

router.route('/me').get(authenticateUser, getProductsByUser);
router.route('/').get(getAllProducts).post(authenticateUser, createProduct);
router
    .route('/:id')
    .get(getProduct)
    .put(authenticateUser, updateProduct)
    .delete(authenticateUser, deleteProduct);

module.exports = router;
