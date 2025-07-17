// admin_backend/Controller/activeOrder.js

const Order = require('../Models/Order');
const FoodItem = require('../Models/FoodItem')
const User=require('../Models/User')
const SpecialRequest = require('../Models/SpecialRequest');





activeOrders = async (req, res) => {
//   console.log("api/admin/orders")
  try {
    const { startDate, endDate } = req.query;
        let query = {};
        
        if (startDate && endDate) {
            query.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
            };
        }
    
    
    
    
        // const orders = await Order.find(query)


    const orders = await Order.find(query)
      .populate({
        path: 'user',
        select: 'name email',
        model: 'User' // Explicitly specify model
      })
      .populate({
        path: 'items.item',
        select: 'name price',
        model: 'FoodItem' // Explicitly specify model
      })
      .lean(); // Convert to plain JS object
    console.log("Active orders", orders)
    console.log("---------------------")
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {activeOrders};