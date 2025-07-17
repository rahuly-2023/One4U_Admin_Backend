// admin_backend/Controller/activeRequests.js


const Order = require('../Models/Order');
const FoodItem = require('../Models/FoodItem')
const User=require('../Models/User')
const SpecialRequest = require('../Models/SpecialRequest');




activeRequests = async (req, res) => {
  try {
    const requests = await SpecialRequest.find()
      .populate('userId', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}



module.exports = {activeRequests};