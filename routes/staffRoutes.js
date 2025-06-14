const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Food = require("../models/Food");
const authorizeRoles = require('../middlewares/authorizeRoles');


// menu item
router.post(
  '/createMenuItem',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('staff'),
  async (req, res) => {
    try {
      const itemsData = req.body;
      if (!Array.isArray(itemsData) || itemsData.length === 0) {
        return res.status(400).json({ message: 'Request body must be a non-empty array' });
      }

      const savedItems = [];

      for (const element of itemsData) {
        const item = new Food(element);
        item.createdBy = req.user._id;
        const result = await item.save();
        savedItems.push(result);
      }

      return res.status(201).json({
        message: 'Menu items created successfully',
        data: savedItems
      });

    } catch (error) {
      console.error('Error creating menu items:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  }
);


router.get(
  '/GetAllItems',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('staff'),
  async (req, res) => {
    try {
      
      const savedItems = await Food.find({});

      return res.status(200).json(savedItems);

    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  }
);

// menu item
router.post(
  '/CreateMenuItem',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('staff'),
  async (req, res) => {
    try {
      const food = req.body;
      if (!food) {
        return res.status(400).json({ message: 'Request body must be a non-empty' });
      }

      const item = new Food(food);
      await item.save();
      return res.status(201).json({
        message: 'Menu Item created successfully',
        data: savedItems
      });

    } catch (error) {
      console.error('Error creating menu item:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  }
);

router.patch(
  '/menu/:id/available',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('staff'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { available } = req.body;

      const updated = await Food.findByIdAndUpdate(
        id,
        { available },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: 'Menu item not found' });
      }

      res.json({ message: 'Availability updated', data: updated });
    } catch (err) {
      console.error('Error updating availability:', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  }
);

router.patch(
  '/menu/:id/quantity',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('staff'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const updated = await Food.findByIdAndUpdate(
        id,
        {
          quantity,
          available: quantity > 0
        },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: 'Menu item not found' });
      }

      res.json({ message: 'Quantity updated', data: updated });
    } catch (err) {
      console.error('Error updating quantity:', err);
      res.status(500).json({ message: 'Server error', error: err });
    }
  }
);

module.exports = router;
