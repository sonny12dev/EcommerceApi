const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

//FOR TESTING PURPOSES
//router.get('/', (req, res) => res.send('your in upload.js'));

router.post(
    '/', 
    uploadController.uploadImages,
    uploadController.resizeAndUpload
    );

module.exports = router;