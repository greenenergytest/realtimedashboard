const express = require('express');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const uploadDirectory = path.join(__dirname, '../../uploads');
const utilityFunctions = require('../../utils/utilities');

console.log(`${uploadDirectory}${utilityFunctions}`);
router.post('/getProblem', (req, res) => {
  console.log('in get problem');

  const mostRecentFile = utilityFunctions.getMostRecentFile(uploadDirectory);

  if (mostRecentFile) {
    const workbook = xlsx.readFile(`${uploadDirectory}/${mostRecentFile}}`);
    const sheetNames = workbook.SheetNames;
    console.log(sheetNames);
  }
});

module.exports = router;
