const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem', // References the MenuItem collection
    required: true,
  },
  cartQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model('CartItemSchema', cartItemSchema);