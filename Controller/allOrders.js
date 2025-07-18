// admin_backend/Controller/allOrder.js


const Order = require('../Models/Order');
const FoodItem = require('../Models/FoodItem')
const User=require('../Models/User')
const SpecialRequest = require('../Models/SpecialRequest');





allOrders = async (req, res) => {
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




    const orders = await Order.find()
      .populate({
        path: 'items.item',
        select: 'name price',
        model: 'FoodItem' // Explicitly specify model
      })
      .lean(); // Convert to plain JS object
    console.log("All orders", orders)
    console.log("---------------------")
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {allOrders};