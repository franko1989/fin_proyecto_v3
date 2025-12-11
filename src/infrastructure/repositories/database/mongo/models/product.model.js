const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  imageUrl: { type: String, default: 'no-image.jpg' },
  marca: { type: String, required: false, default: 'No definida' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);