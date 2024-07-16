const express = require("express");
const router = express.Router();
const cors = require('cors');
const Dish = require("../models/DishSchema");
const dishData = require('../dish');
router.use(cors());
// Initialize database with data from external source

router.get('/init-db', async (req, res) => {
    try {
        await Dish.insertMany(dishData);
        return res.status(201).send({ 'mess': 'Data added successfully in Database...' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error });
    }
});

// Fetch all transactions with optional search and pagination

router.get('/dishes', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/toggle/:dishId', async(req, res) => {
    try {
        const dish = await Dish.findOne({ dishId: req.params.dishId });
        if (!dish) return res.status(404).json({ message: 'Dish not found' });
    
        dish.isPublished = !dish.isPublished;
        await dish.save();
    
        res.json(dish);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

module.exports = router