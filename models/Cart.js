const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food', // References the Food collection
    required: true,
  },
  cartQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // References the users collection
    required: true,
    unique: true, // One cart per user
  },
  items: [cartItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);