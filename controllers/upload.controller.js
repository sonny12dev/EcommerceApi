const multer = require("multer");
const sharp = require("sharp");
const itemsModel = require('../models/item.model');

//For testing purposes
// exports.forTesting = async (req, res) => {
//     res.send('Your in upload.controller');
// }

const multerStorage = multer.memoryStorage();

//Checks if image
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.single("image");

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.json("Only one image is allowed.");
        }
    } else if (err) {
        return res.json(err + ' error unknown');
    }

    //If no error encountered, It means it is stored in memory
    //res.json({success: true, msg: 'you pass uploadImage'});
    next();
  });
};

const resizeAndUpload = async (req, res, next) => {

    //If user submit but did not choose an image
    if (!req.file) return res.json({ success: false, msg: `You must select at least 1 image.`});

      //I did not include var, const or let so i can pass newFilename to uploadData
      newFilename = `${Date.now()}_image.jpeg`;
      //res.json({success: true, msg: 'there is a file now'});

      await sharp(req.file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`upload/${newFilename}`)
        .then( async data => {
          const newItem = new itemsModel({
            itemName: req.body.itemName,
            itemDescription: req.body.itemDescription,
            amount: req.body.amount,
            imagePath: newFilename
          });
        
          savedItem = await newItem.save();

          res.
          status(200).
          json({ 
            success: true,
            msg: 'saved successfully'
            //data: savedItem 
          });
          
        })
        .catch( err => res.status(400).json({ success: false, msg: err }));

};


module.exports = {
   //You can also declare uploadImages, resizeImages and getResult directly instead of uploadImages: uploadImages as long as it is the same. This works in typescript new version
  uploadImages,
  resizeAndUpload
};