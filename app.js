const Order = require('./Models/Order');
const FoodItem = require('./Models/FoodItem')
const User=require('./Models/User')
const SpecialRequest = require('./Models/SpecialRequest');
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes=require('./routes')
require('dotenv').config();


// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})
.then(() => console.log("DB Connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 6000;


// Middleware
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api',routes)

app.get('', (req, res) => {
  res.send('API is working!');
});




app.use('/api', routes);



app.listen(PORT, () => {
  console.log(`Admin server running on port ${PORT}`);
});
