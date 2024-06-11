const express = require('express');
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');

const router = express.Router();

const uploadDirectory = path.join(__dirname, '../../uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/getGraphData', upload.single('file'), (req, res) => {
  const { selectedXColumns, selectedYColumns, fileName } = req.body;

  const workbook = xlsx.readFile(`${uploadDirectory}/${fileName}`);
  const sheetNames = workbook.SheetNames;
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const headers = data[0];

  const xData = data.map((row) => {
    return selectedXColumns.map((col) => {
      const cellValue = row[headers.indexOf(col)];
      return isDate(cellValue) ? formatDate(cellValue) : cellValue;
    });
  });

  const yData = data.map((row) =>
    selectedYColumns.map((col) => {
      const cellValue = row[headers.indexOf(col)];
      return isDate(cellValue) ? formatDate(cellValue) : cellValue;
    })
  );

  res.json({ xData, yData, sheetNames });
});

// Function to check if a value is a date
function isDate(value) {
  return (
    Object.prototype.toString.call(value) === '[object Date]' &&
    !isNaN(value.getTime())
  );
}

// Function to format date
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? '0' : ''}${month}-${
    day < 10 ? '0' : ''
  }${day}`;
}

module.exports = router;
