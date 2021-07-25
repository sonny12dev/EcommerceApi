const express = require('express');
const router = express.Router();
const addToCartController = require('../controllers/addToCartController');

router.get('/', addToCartController.addItem);
//router.get('/', (req, res) => res.send('your in addItem.js'));

module.exports = router;