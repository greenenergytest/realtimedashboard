const express = require('express');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const utilityFunctions = require('../../utils/utilities');

const router = express.Router();

const uploadDirectory = path.join(__dirname, '../../uploads');

router.post('/getFieldData', (req, res) => {
  console.log('in get field data');
  const { sheetName } = req.body;

  const mostRecentFile = utilityFunctions.getMostRecentFile(uploadDirectory);

  if (mostRecentFile) {
    const workbook = xlsx.readFile(`${uploadDirectory}/${mostRecentFile}`);
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log('logging out the data');
    console.log(data);

    const cummulativeColumn = ' Cummlative Oil (bbls) ';
    const cummulativeFilteredData = data.filter(
      (row) => row[cummulativeColumn] !== undefined
    );

    console.log('cummulative filtered data');
    console.log(cummulativeFilteredData);
    // sort the filtered data by index to get the most recent value
    cummulativeFilteredData.sort((a, b) => a._index - b._index);

    let currentCummulative =
      cummulativeFilteredData.length > 0
        ? cummulativeFilteredData[cummulativeFilteredData.length - 1][
            cummulativeColumn
          ]
        : undefined;

    currentCummulative = currentCummulative.toFixed(2);

    const waterCutColumn = 'BS&W';

    // Get all the bsw data that is not equal to undefined in an array
    const waterCutFilteredData = data.filter(
      (row) => row[waterCutColumn] !== undefined
    );

    //sort the filtered data by index
    waterCutFilteredData.sort((a, b) => a._index - b._index);

    //Get the most recent value of the column
    let currentWaterCut =
      waterCutFilteredData.length > 0
        ? waterCutFilteredData[waterCutFilteredData.length - 1][waterCutColumn]
        : undefined;

    console.log('Logging out the current water cut');
    console.log(currentWaterCut);
    currentWaterCut = currentWaterCut.toFixed(2);

    const gorColumn = ' GOR (SCF/bbls) ';
    const gorFilteredData = data.filter((row) => row[gorColumn] !== undefined);
    gorFilteredData.sort((a, b) => a._index - b._index);
    let currentGor =
      gorFilteredData.length > 0
        ? gorFilteredData[gorFilteredData.length - 1][gorColumn]
        : undefined;
    currentGor = currentGor.toFixed(2);

    const oilRateColumn = ' Oil production (bbls) ';
    const oilRateFilteredData = data.filter(
      (row) => row[oilRateColumn] !== undefined
    );
    oilRateFilteredData.sort((a, b) => a._index - b._index);
    let currentOilRate =
      oilRateFilteredData.length > 0
        ? oilRateFilteredData[oilRateFilteredData.length - 1][oilRateColumn]
        : undefined;

    currentOilRate = currentOilRate.toFixed(2);

    res.json({
      currentCummulative,
      currentWaterCut,
      currentGor,
      currentOilRate,
    });
  } else {
    res.send('No files found in the directory');
  }
});

module.exports = router;
