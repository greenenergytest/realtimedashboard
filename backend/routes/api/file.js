const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

//Create the upload directory if it doesn't exist
const uploadDirectory = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve static
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }
  res.send('File uploaded successfully');
});

module.exports = router;
