// admin_backend/Controller/activeRequests.js

const Order = require('../Models/Order');
const FoodItem = require('../Models/FoodItem')
const User=require('../Models/User')
const SpecialRequest = require('../Models/SpecialRequest');






completeRequests = async (req, res) => {
  try {
    await SpecialRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request completed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {completeRequests};