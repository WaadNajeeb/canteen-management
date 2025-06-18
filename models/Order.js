const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },

    items: [
      {
        menuItem: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],

    totalAmount: { type: Number, required: true },

    paymentType: {
      type: String,
      enum: ['counter', 'credit_card'],
      required: true
    },

    mealType: {
      type: String,
      enum: ['recess', 'lunch'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('orders', orderSchema);
