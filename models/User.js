const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;
const cartItemSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  cartQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

const userSchema = new Schema(
  {
    avatar: {
      type: Number,
      required: true,
      default: 1,
    },

    fullName: {
      type: String,
      required: true, //mandatory attribute
      trim: true, //cuts whitespace at the end of the input field
      minlength: 3, //sets min name length to 3 chars
      default: '',
    },

    email: {
      type: String,
      required: true,
      unique: true, //primary key will be email (already configured in MongoDB Atlas)
      default: '',
    },

    password: {
      type: String,
      required: true,
      default: '',
    },

    emailVerified: {
      //boolean to log if user email has been verified or not
      type: Boolean,
      required: true,
      default: false,
    },

    passwordRequested: {
      type: Boolean,
      required: true,
      default: false,
    },
    
    role: {
      type: String,
      enum: ['customer', 'staff'],
      required: true,
      default: 'customer'
    },
    experiencePoints: {
      type: Number,
      required: true,
      default: 0,
    },

    //should the user want to add a description on their profile page
    personalDescription: {
      type: String,
      required: false,
    },

    //favours the user has made
    myPastOrders: [{ type: Schema.Types.ObjectId, ref: 'orders' }],

    //favours the user owes
    myFavourites: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    cart:[cartItemSchema]

  },
  {
    timestamps: true, //Adds last modified and user creation time to MongoDB collection
  }
);

userSchema.methods.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model('users', userSchema);