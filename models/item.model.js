const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    amount: { type: Number, required: true },
    imagePath: { type: String, required: true },
    // quantity: { type: Number, required: true },
    // itemImageFilename: { type: String, required: true }
});

module.exports = mongoose.model('Item', itemSchema);