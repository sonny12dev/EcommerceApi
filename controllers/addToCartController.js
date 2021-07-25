//You need to put MODEL inside the controller for it to work
const itemModel = require('../models/item.model');

const addItem = async (req, res) => {
    //For testing purpose
    //res.send('Your in upload.controller');
    try{
        const getAllItem = await itemModel.find();
        res.json(getAllItem);
    }catch(err){
        res.json({message: err});
    }

}

const transaction = async (req, res) => {
    
}

module.exports = {
    addItem
}