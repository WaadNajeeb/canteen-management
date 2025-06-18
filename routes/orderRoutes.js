const express = require('express');
const passport = require('passport');
const router = express.Router();
const Order = require('../models/Order');
const Food = require('../models/food');
const User = require('../models/User');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {

      const userId = req.user.id;
      const user = await User.findById(userId).populate('cart.foodId');


      const { paymentType, mealType } = req.body;

      if (!Array.isArray(user.cart) || user.cart.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }

      if (!['counter', 'credit_card'].includes(paymentType)) {
        return res.status(400).json({ message: 'Invalid payment type' });
      }

      if (!['recess', 'lunch'].includes(mealType)) {
        return res.status(400).json({ message: 'Invalid meal type' });
      }

      let totalAmount = 0;
      const items = [];

      for (const cartItem of user.cart) {
        const menuItem = cartItem.foodId;

        totalAmount += menuItem.price * cartItem.cartQuantity;

        items.push({
          menuItem: cartItem.foodId,
          quantity: cartItem.cartQuantity
        });
      }

      const newOrder = new Order({
        user: user._id,
        items,
        paymentType,
        mealType,
        totalAmount,
        // status will default to 'pending'
      });

      const savedOrder = await newOrder.save();
       user.myPastOrders.push(savedOrder._id);
      user.cart = [];
      await user.save();

      res.status(201).json({ message: 'Order placed', data: savedOrder });
    } catch (err) {
      console.error('Order creation error:', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  }
);



router.get(
  '/my',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;

      const orders = await Order.find({ user: userId })
         .populate({
          path: 'items.menuItem',
          select: '_id name price' // ✅ only fetch name and price from Food
        })
        .sort({ createdAt: -1 });  // most recent orders first

     // Transform the response
      const result = orders.map(order => ({
        createdAt: order.createdAt,
        status: order.status,
        totalAmount: order.totalAmount,
        items: order.items.map(item => ({
          id: item.menuItem._id,
          name: item.menuItem?.name || 'Item Deleted',
          price: item.menuItem?.price || 0,
          quantity: item.quantity,
          total_price: item.menuItem?.price * item.quantity
        }))
      }));

      res.json(result);
    } catch (err) {
      console.error('Error fetching user orders:', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  }
);
// 🧾 Staff: View all customer orders
router.get(
  '/orders',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('staff'),
  async (req, res) => {
    try {
      const user = await User.findById(userId).populate('myPastOrders._id');
     
        res.json( user.myPastOrders);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  }
);

// ✅ Staff: Update order status
router.patch(
  '/orders/:id/status',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('staff'),
  async (req, res) => {
    try {
      const { status } = req.body;
      const updated = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      res.json({ message: 'Order status updated', data: updated });
    } catch (err) {
      res.status(500).json({ message: 'Error updating order status', error: err });
    }
  }
);


router.patch(
  '/orders/:id/complete',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('staff'),
  async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: 'completed' },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json({ message: 'Order marked as completed', data: order });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
    }
  }
);


module.exports = router;