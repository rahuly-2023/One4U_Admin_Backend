const FoodCategory = require('../Models/FoodCategory');
const FoodItem = require('../Models/FoodItem');

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    
    const newCategory = new FoodCategory({
      name,
      description,
      imageUrl
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Error creating food category' });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await FoodCategory.find().populate('items');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching food categories' });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl } = req.body;
    
    const updatedCategory = await FoodCategory.findByIdAndUpdate(
      id,
      { name, description, imageUrl },
      { new: true }
    );
    
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Error updating food category' });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First, remove this category from all food items
    await FoodItem.updateMany(
      { category: id },
      { $unset: { category: "" } }
    );
    
    const deletedCategory = await FoodCategory.findByIdAndDelete(id);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting food category' });
  }
};