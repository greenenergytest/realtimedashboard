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

router.post('/getWellGraph', upload.single('file'), (req, res) => {
  const {
    selectedXColumns,
    selectedPrimaryYColumns,
    selectedSecondaryYColumns,
    fileName,
    sheetName,
  } = req.body;

  const workbook = xlsx.readFile(`${uploadDirectory}/${fileName}`);
  const sheetNames = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const headers = data[0];

  console.log('in well graph');
  console.log(data);

  const xData = data.map((row) => {
    return selectedXColumns.map((col) => {
      const cellValue = row[headers.indexOf(col)];
      return isDate(cellValue) ? formatDate(cellValue) : cellValue;
    });
  });

  const yPrimaryData = data.map((row) => {
    return selectedPrimaryYColumns.map((col) => {
      const cellValue = row[headers.indexOf(col)];
      return isDate(cellValue) ? formatDate(cellValue) : cellValue;
    });
  });

  const ySecondaryData = data.map((row) => {
    return selectedSecondaryYColumns.map((col) => {
      const cellValue = row[headers.indexOf(col)];
      return isDate(cellValue) ? formatDate(cellValue) : cellValue;
    });
  });

  //console.log(yPrimaryData);
  console.log('logging out secondary data');
  console.log(ySecondaryData);

  res.json({ xData, yPrimaryData, ySecondaryData, sheetNames });
});

// function to check if a value is a date
function isDate(value) {
  return (
    Object.prototype.toString.call(value) === '[object Date]' &&
    !isNaN(value.getTime())
  );
}

// function to format date
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? '0' : ''}${month}-${
    day < 10 ? '0' : ''
  }${day}`;
}

module.exports = router;
