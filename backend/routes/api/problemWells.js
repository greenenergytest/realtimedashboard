const express = require('express');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const uploadDirectory = path.join(__dirname, '../../uploads');
const utilityFunctions = require('../../utils/utilities');

router.post('/getProblemWells', (req, res) => {
  //const mostRecentFile = utilityFunctions.getMostRecentFile(uploadDirectory);

  //if (mostRecentFile) {
  const { fileName } = req.body;
  console.log(`logging request body in problem wells: ${req.body}`);
  const workbook = xlsx.readFile(`${uploadDirectory}/${fileName}`);
  const sheetNames = workbook.SheetNames;
  const filteredSheetNames = sheetNames.filter((item) =>
    item.includes('Daily')
  );

  let wellHealth = {};

  filteredSheetNames.forEach((sheetName) => {
    // let sheetName = '5S Daily';
    let worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    // console.log(data);
    // console.log(sheetName);
    const waterCutColumn = 'Water Cut';
    const waterCutFilteredData = data.filter(
      (row) => row[waterCutColumn] !== undefined
    );

    waterCutFilteredData.sort((a, b) => a._index - b._index);

    let currentWaterCut =
      waterCutFilteredData.length > 0
        ? waterCutFilteredData[waterCutFilteredData.length - 1][waterCutColumn]
        : undefined;

    currentWaterCut = currentWaterCut.toFixed(2);

    //TODO: continue with thubing head pressure and GOR
    const fthpColumn = 'FTHP';
    const fthpFilteredData = data.filter(
      (row) => row[fthpColumn] !== undefined
    );
    fthpFilteredData.sort((a, b) => a._index - b._index);
    let currentFthp =
      fthpFilteredData.length > 0
        ? fthpFilteredData[fthpFilteredData.length - 1][fthpColumn]
        : undefined;

    currentFthp = currentFthp.toFixed(2);

    const gorColumn = 'GOR';
    const gorFilteredData = data.filter((row) => row[gorColumn] !== undefined);
    gorFilteredData.sort((a, b) => a._index - b._index);
    let initialGor =
      gorFilteredData.length > 0 ? gorFilteredData[1][gorColumn] : undefined;

    initialGor = initialGor.toFixed(2);
    let currentGor =
      gorFilteredData.length > 0
        ? gorFilteredData[gorFilteredData.length - 1][gorColumn]
        : undefined;
    currentGor = currentGor.toFixed(2);

    let isHealthy = 'healthy';
    if (
      currentWaterCut > 30 ||
      currentGor > 3 * initialGor ||
      currentFthp <= 200
    ) {
      isHealthy = 'Not Healthy';
    }
    wellHealth[sheetName] = isHealthy;
  });

  res.json({
    wellHealth,
  });
  // } else {
  //   res.send('No files found in the directory');
  // }
});

module.exports = router;
