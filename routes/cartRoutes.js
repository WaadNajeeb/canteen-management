const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Food = require('../models/food');
const passport = require("passport");
const authorizeRoles = require("../middlewares/authorizeRoles");



router.get('/',  passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('cart.foodId');

    res.json( user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.user.id;

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ message: 'Food item not found' });
    if (food.quantity < 1 || !food.available) return res.status(400).json({ message: 'Item out of stock or unavailable' });

    const user = await User.findById(userId); // ✅ Define `user` here

    const existingItem = user.cart.find(item => item.foodId.equals(foodId));
    if (existingItem) {
      if (existingItem.cartQuantity >= food.quantity) {
        return res.status(400).json({ message: 'Cannot add more; stock limit reached' });
      }
      existingItem.cartQuantity += 1;
    } else {
      user.cart.push({ foodId, cartQuantity: 1 });
    }

    await user.save();
    const populatedUser = await User.findById(userId).populate('cart.foodId');
    res.json(populatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/update',  passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { foodId, cartQuantity } = req.body;
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ message: 'Food item not found' });
    if (cartQuantity > food.quantity) {
      return res.status(400).json({ message: `Cannot set quantity to ${cartQuantity}; only ${food.quantity} available` });
    }

    const item = user.cart.find(item => item.foodId.equals(foodId));
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    if (cartQuantity === 0) {
      user.cart = user.cart.filter(item => !item.foodId.equals(foodId));
    } else {
      item.cartQuantity = cartQuantity;
    }

    await user.save();
    const populatedUser = await User.findById(userId).populate('cart.foodId');
    res.json({ userId, items: populatedUser.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/remove',  passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(item => !item.foodId.equals(foodId));
    await user.save();
    const populatedUser = await User.findById(userId).populate('cart.foodId');
    res.json({ userId, items: populatedUser.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/clear',  passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) return res.status(401).json({ message: 'User not authenticated' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = [];
    await user.save();
    res.json({ userId, items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;