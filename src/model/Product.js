const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        product_name: {
            type: String,
            required: [true, 'Cần cung cấp tên sản phẩm'],
            maxlength: 100,
        },
        describe: { type: String, required: [true, 'Cần cung cấp mô tả sản phẩm'] },
        price: { type: String, default: '' },
        images_url: { type: String, default: '' },
        status: {
            type: String,
            enum: ['new', 'requesting', 'trading', 'completed'],
            default: 'new',
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Please provide category id'],
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);