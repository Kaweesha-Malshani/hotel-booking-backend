import Category from "../models/catogery.js";
import User from "../models/user.js"; 

export const addCategory = async (req, res) => {
  const { name, description, price } = req.body;
  
  try {
    const user = await User.findById(req.user.id); 

    if (user.type !== "admin") {
      return res.status(403).json({ message: "Only admins can add categories" });
    }

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      name,
      description,
      price,
      addedBy: req.user.id
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
