const express = require('express');
const passport = require('passport');
const router = express.Router();
const Order = require('../models/Order');
const Food = require('../models/food');
const authorizeRoles = require('../middlewares/authorizeRoles');

// 🛒 Create order (user)
router.post(
  '/orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const { items, paymentType } = req.body;

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'No items provided' });
      }

      // Calculate total
      let totalAmount = 0;

      for (const item of items) {
        const menuItem = await Food.findById(item.menuItem);
        if (!menuItem || !menuItem.available) {
          return res.status(400).json({ message: `Menu item not available: ${item.menuItem}` });
        }
        totalAmount += menuItem.price * item.quantity;
      }

      const newOrder = new Order({
        user: userId,
        items,
        paymentType,
        totalAmount
      });

      const saved = await newOrder.save();
      res.status(201).json({ message: 'Order placed', data: saved });
    } catch (err) {
      console.error('Order creation error:', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  }
);

// 📜 Get logged-in user's past orders
router.get(
  '/orders/my',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id;
      const orders = await Order.find({ user: userId })
        .populate('items.menuItem')
        .sort({ createdAt: -1 });

      res.json({ data: orders });
    } catch (err) {
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
      const orders = await Order.find()
        .populate('user', 'fullName email')
        .populate('items.menuItem')
        .sort({ createdAt: -1 });

      res.json({ data: orders });
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