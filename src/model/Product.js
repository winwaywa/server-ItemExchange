const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        product_name: {
            type: String,
            required: [true, 'Cần cung cấp tên sản phẩm'],
            maxlength: 100,
        },
        describe: { type: String, required: [true, 'Cần cung cấp mô tả sản phẩm'] },
        percent_new: { type: Number, default: 100 },
        price: { type: String, default: '' },
        images_url: { type: String, default: '' },
        status: {
            type: String,
            enum: ['disable', 'enable', 'exchanging', 'exchanged'],
            default: 'disable',
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
