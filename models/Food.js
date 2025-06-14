const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: ['Main', 'Drinks', 'Drink', 'Snack', 'Dessert', 'Special', 'Appetizers', 'Main Courses', 'Sides',
        'Vegetarian', 'Vegan', 'Breakfast'
      ],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    available: {
      type: Boolean,
      default: true,
    },
    isTopPick: {
      type: Boolean,
      default: false,
    },
    allergens: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Food', foodSchema);