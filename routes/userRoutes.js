const express = require('express');
const passport = require('passport');
const router = express.Router();
const Order = require('../models/Order');
const Food = require('../models/food');
const authorizeRoles = require('../middlewares/authorizeRoles');
const User = require('../models/User');

// Add to favourites


router.post(
  '/favourites/:menuItemId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { menuItemId } = req.params;
    const user = await User.findById(req.user.id);

    const isFavourite = user.myFavourites.includes(menuItemId);

    if (isFavourite) {
      user.favourites = user.myFavourites.filter(id => id.toString() !== menuItemId);
      await user.save();
      return res.json({ message: 'Removed from favourites', removed: true });
    } else {
      user.myFavourites.push(menuItemId);
      await user.save();
      return res.json({ message: 'Added to favourites', added: true });
    }
  }
);



router.get(
  "/favourites",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { page = 1, search = "" } = req.query;
      const pageNumber = parseInt(page, 10);
      const limitNumber = 12;

      const user = await User.findById(req.user._id)
        .populate({
          path: "myFavourites",
          match: {
            available: true,
            name: { $regex: search, $options: "i" },
          },
        });

      const favourites = user?.myFavourites || [];

      const totalItems = favourites.length;
      const startIndex = (pageNumber - 1) * limitNumber;
      const endIndex = startIndex + limitNumber;
      const paginatedItems = favourites.slice(startIndex, endIndex);

      res.json({
        items: paginatedItems,
        totalItems,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalItems / limitNumber),
      });
    } catch (err) {
      console.error("Error fetching favourites:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);


router.get(
  '/favourites/IsFavourite/:menuItemId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { menuItemId } = req.params;
    const user = await User.findById(req.user.id);

    const isFavourite = user.myFavourites.includes(menuItemId);

    return res.json(isFavourite);
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