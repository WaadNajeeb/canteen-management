const express = require('express');
const passport = require('passport');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const authorizeRoles = require('../middleware/authorizeRoles');

// Add to favourites
router.post(
  '/favourites/:menuItemId',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user'),
  async (req, res) => {
    const { menuItemId } = req.params;
    const user = await User.findById(req.user._id);

    if (user.favourites.includes(menuItemId)) {
      return res.status(400).json({ message: 'Already in favourites' });
    }

    user.favourites.push(menuItemId);
    await user.save();
    res.json({ message: 'Added to favourites' });
  }
);

router.delete(
  '/favourites/:menuItemId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { menuItemId } = req.params;
    const user = await User.findById(req.user._id);

    user.favourites = user.favourites.filter(id => id.toString() !== menuItemId);
    await user.save();
    res.json({ message: 'Removed from favourites' });
  }
);

router.get(
  '/favourites',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user._id).populate('favourites');
    res.json({ favourites: user.favourites });
  }
);

router.get(
  '/orders/mine',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id)
        .populate({
          path: 'myPastOrders',
          populate: {
            path: 'items.menuItem', // assuming order has items with menuItem reference
            model: 'menu'
          }
        });

      res.json({ orders: user.myPastOrders });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch past orders', error: err });
    }
  }
);


module.exports = router;