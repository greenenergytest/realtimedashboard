const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

const router = express.Router();

//Create the upload directory if it doesn't exist
const uploadDirectory = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Serve static
router.use('/uploads', express.static(uploadDirectory));

//Route to handle file upload
router.post('/upload', (req, res) => {
  console.log('here');
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log('here in 400');
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;
  const fileName = file.name;

  file.mv(`${uploadDirectory}/${file.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const workbook = xlsx.readFile(`${uploadDirectory}/${file.name}`);
    const sheetNames = workbook.SheetNames;
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const columnNames = [];

    // Loop through all keys in the worksheet
    for (let key in worksheet) {
      // Check if the key represents the first row (row 1)
      if (key[1] === '1' && worksheet.hasOwnProperty(key)) {
        // Get the column name from the first row
        const columnName = worksheet[key].v;
        // Check if the column name is a string
        if (typeof columnName === 'string') {
          columnNames.push(columnName);
        }
      }
    }

    res.json({ fileName, columnNames, sheetNames }); // Send column names as response
  });
});

module.exports = router;
