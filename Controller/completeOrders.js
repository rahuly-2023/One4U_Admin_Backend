// admin_backend/Controller/completeOrder.js


const Order = require('../Models/Order');
const FoodItem = require('../Models/FoodItem')
const User=require('../Models/User')
const SpecialRequest = require('../Models/SpecialRequest');





completeOrders = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'delivered' },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {completeOrders};