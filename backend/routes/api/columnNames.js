const express = require('express');
const multer = require('multer');
const path = require('path');

const xlsx = require('xlsx');

const router = express.Router();
const uploadDirectory = path.join(__dirname, '../../uploads');

router.post('/getColumnNames', (req, res) => {
  const { fileName, sheetName } = req.body;

  const workbook = xlsx.readFile(`${uploadDirectory}/${fileName}`);

  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet ${sheetName} not found in file ${fileName}`);
  }

  //Get the range of the sheet
  const range = xlsx.utils.decode_range(sheet['!ref']);

  //Extract the column names from the first row
  const columnNames = [];
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[xlsx.utils.encode_cell({ r: range.s.r, c: C })];
    if (cell && cell.t) {
      columnNames.push(xlsx.utils.format_cell(cell));
    }
  }
  res.json({ columnNames });
});

module.exports = router;
