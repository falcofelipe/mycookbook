const express = require('express');
const router = express.Router();
const { cloudinary } = require('../utils/cloudinary');

router.post('/', (req, res) => {
  try {
    console.log(Object.values(req.files));
    const path = Object.values(req.files)[0].path;
    cloudinary.uploader.upload(path).then(image => {
      console.log('Uploaded');
      console.log(image);
      res.json(image);
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
