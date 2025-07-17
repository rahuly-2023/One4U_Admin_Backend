// admin_backend/Controller/foodItemController.js


const FoodItem = require('../Models/FoodItem');
const FoodCategory = require('../Models/FoodCategory');

// Create new food item
exports.createFoodItem = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    
    // Verify category exists
    const categoryExists = await FoodCategory.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category does not exist' });
    }
    
    const newFoodItem = new FoodItem({
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable: true
    });

    const savedItem = await newFoodItem.save();
    
    // Add this item to the category's items array
    await FoodCategory.findByIdAndUpdate(
      category,
      { $push: { items: savedItem._id } }
    );
    
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating food item:', error);
    res.status(500).json({ message: 'Error creating food item' });
  }
};

// Get all food items
exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find().populate('category');
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ message: 'Error fetching food items' });
  }
};

// Update food item
exports.updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, imageUrl, isAvailable } = req.body;
    
    // If category is being updated, we need to update both old and new category references
    const existingItem = await FoodItem.findById(id);
    if (!existingItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    
    if (category && existingItem.category.toString() !== category) {
      // Remove from old category
      await FoodCategory.findByIdAndUpdate(
        existingItem.category,
        { $pull: { items: id } }
      );
      
      // Add to new category
      await FoodCategory.findByIdAndUpdate(
        category,
        { $push: { items: id } }
      );
    }
    
    const updatedItem = await FoodItem.findByIdAndUpdate(
      id,
      { name, description, price, category, imageUrl, isAvailable },
      { new: true }
    ).populate('category');
    
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).json({ message: 'Error updating food item' });
  }
};

// Delete food item
exports.deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First remove from its category
    const item = await FoodItem.findById(id);
    if (item && item.category) {
      await FoodCategory.findByIdAndUpdate(
        item.category,
        { $pull: { items: id } }
      );
    }
    
    const deletedItem = await FoodItem.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ message: 'Error deleting food item' });
  }
};

// Toggle food item availability
exports.toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    
    const item = await FoodItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    
    item.isAvailable = !item.isAvailable;
    await item.save();
    
    res.json(item);
  } catch (error) {
    console.error('Error toggling availability:', error);
    res.status(500).json({ message: 'Error toggling food item availability' });
  }
};