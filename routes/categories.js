const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const newcat = new Category(req.body);

  try {
    const savedCategory = await newcat.save();

    res.status(200).json(savedCategory);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();

    res.status(200).json(cats);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
