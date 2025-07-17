// admin_backend/Models/routes.js


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {activeOrders}=require('./Controller/activeOrders');
const {allOrders}=require('./Controller/allOrders');
const {activeRequests}=require('./Controller/activeRequests')
const {completeOrders}=require('./Controller/completeOrders');
const {completeRequests}=require('./Controller/completeRequests')
const {UpdateStatus}=require('./Controller/UpdateStatus')
const  {signup}=require('./Controller/Signup')
const {login}=require('./Controller/Login')







const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require('./Controller/foodCategoryController');
const {
  createFoodItem,
  getAllFoodItems,
  updateFoodItem,
  deleteFoodItem,
  toggleAvailability
} = require('./Controller/foodItemController');

// Food Category routes
router.post('/categories', createCategory);
router.get('/categories', getAllCategories);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Food Item routes
router.post('/fooditems', createFoodItem);
router.get('/fooditems', getAllFoodItems);
router.put('/fooditems/:id', updateFoodItem);
router.delete('/fooditems/:id', deleteFoodItem);
router.put('/fooditems/:id/toggle', toggleAvailability);








router.post('/signup',signup)
router.post('/login',login)







// const jwt = require('jsonwebtoken');

// Sample route
router.get('', (req, res) => {
  res.send('API is working!');
});


// Admin Auth Middleware
const authenticateAdmin = (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // if (decoded.role !== 'admin') {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};







router.get('/orders', authenticateAdmin, activeOrders);
router.get('/allorders', authenticateAdmin, allOrders);
router.put('/orders/:id/complete',authenticateAdmin,  completeOrders);

router.get('/requests',authenticateAdmin,  activeRequests);
router.put('/requests/:id/complete',authenticateAdmin, completeRequests);



// ✅ 2. PUT Status Route in routes/order.js
router.put('/orders/:id/status',  UpdateStatus);






module.exports = router;
