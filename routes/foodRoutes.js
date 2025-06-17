const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Food = require("../models/food");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/menu", async (req, res) => {
  try {
    const { search, category, available } = req.query;

    const filter = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" }; // case-insensitive
    }
    if (category) {
      filter.category = category;
    }
    if (available !== undefined) {
      filter.available = available === "true";
    }

    const items = await Food.find(filter).sort({ createdAt: -1 });
    res.json({ data: items });
  } catch (err) {
    console.error("Error fetching menu:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

router.get(
  "/top-menu-pick",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const items = await Food.find({ isTopPick: true }).limit(4);
      if (!items || items.length === 0) {
        return res.status(404).json({ message: "No items found" });
      }
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);


router.get(
  "/menu/all",
  async (req, res) => {
    try {
      const { page = 1, search = "" } = req.query;

      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(12, 10);

      // Build search criteria (case-insensitive)
      const searchCriteria = {
        available: true,
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };

      const items = await Food.find(searchCriteria)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

      const totalItems = await Food.countDocuments(searchCriteria);

      res.json({
        items,
        totalItems,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalItems / limitNumber),
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);



router.get("/menu/:id", async (req, res) => {
  try {
    const item = await Food.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ data: item });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

router.post(
  "/menu",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("staff"),
  async (req, res) => {
    try {
      const item = new menu({ ...req.body, createdBy: req.user._id });
      const saved = await item.save();
      res.status(201).json({ message: "Item created", data: saved });
    } catch (err) {
      res.status(500).json({ message: "Failed to create item", error: err });
    }
  }
);

router.patch(
  "/menu/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("staff"),
  async (req, res) => {
    try {
      const updated = await Food.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updated) return res.status(404).json({ message: "Item not found" });
      res.json({ message: "Updated", data: updated });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);

router.delete(
  "/menu/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("staff"),
  async (req, res) => {
    try {
      const result = await Food.findByIdAndDelete(req.params.id);
      if (!result) return res.status(404).json({ message: "Item not found" });
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);

module.exports = router;
