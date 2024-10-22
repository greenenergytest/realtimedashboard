const express = require('express');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const utilityFunctions = require('../../utils/utilities');

const router = express.Router();

const uploadDirectory = path.join(__dirname, '../../uploads');

router.post('/getFieldData', (req, res) => {
  console.log('in get field data');
  const { sheetName, fileName } = req.body;
  // console.log('Logging request body');
  // console.log(req.body);
  // const mostRecentFile = utilityFunctions.getMostRecentFile(uploadDirectory);

  // if (mostRecentFile) {
  const workbook = xlsx.readFile(`${uploadDirectory}/${fileName}`);
  console.log(sheetName);
  const worksheet = workbook.Sheets[sheetName];

  const data = xlsx.utils.sheet_to_json(worksheet);

  console.log('logging out the data');
  console.log(data);

  const cummulativeColumn = ' Cummlative Oil (bbls) ';
  const cummulativeFilteredData = data.filter(
    (row) => row[cummulativeColumn] !== undefined
  );
  let currentCummulative = 0;

  const otherReservoirsCummulativeColumn = 'Cumm Oil';
  const otherReservoirsCummulativeFilteredData = data.filter(
    (row) => row[otherReservoirsCummulativeColumn] !== undefined
  );

  const remainingReservoirsCummulativeColumn = 'Cumm. Oil';
  const remainingReservoirsCummulativeFilteredData = data.filter(
    (row) => row[remainingReservoirsCummulativeColumn] !== undefined
  );

  if (cummulativeFilteredData.length > 0) {
    // sort the filtered data by index to get the most recent value
    cummulativeFilteredData.sort((a, b) => a._index - b._index);

    currentCummulative =
      cummulativeFilteredData.length > 0
        ? cummulativeFilteredData[cummulativeFilteredData.length - 1][
            cummulativeColumn
          ]
        : undefined;
    currentCummulative = currentCummulative.toFixed(0) + '-bbls';
  } else if (otherReservoirsCummulativeFilteredData.length > 0) {
    otherReservoirsCummulativeFilteredData.sort((a, b) => a._index - b._index);
    currentCummulative =
      otherReservoirsCummulativeFilteredData.length > 0
        ? otherReservoirsCummulativeFilteredData[
            otherReservoirsCummulativeFilteredData.length - 1
          ][otherReservoirsCummulativeColumn]
        : undefined;

    currentCummulative = currentCummulative.toFixed(2) + '-stb';
  } else if (remainingReservoirsCummulativeFilteredData.length > 0) {
    remainingReservoirsCummulativeFilteredData.sort(
      (a, b) => a._index - b._index
    );
    currentCummulative =
      remainingReservoirsCummulativeFilteredData.length > 0
        ? remainingReservoirsCummulativeFilteredData[
            remainingReservoirsCummulativeFilteredData.length - 1
          ][remainingReservoirsCummulativeColumn]
        : undefined;
    currentCummulative = currentCummulative.toFixed(2) + '-mbl';
  }

  const waterCutColumn = 'BS&W';
  // Get all the bsw data that is not equal to undefined in an array
  const waterCutFilteredData = data.filter(
    (row) => row[waterCutColumn] !== undefined
  );
  let currentWaterCut = 0;

  const otherWaterCutColumn = 'Water Cut';
  const otherWaterCutFilteredData = data.filter(
    (row) => row[otherWaterCutColumn] !== undefined
  );

  if (waterCutFilteredData.length > 0) {
    //sort the filtered data by index
    waterCutFilteredData.sort((a, b) => a._index - b._index);

    //Get the most recent value of the column
    currentWaterCut =
      waterCutFilteredData.length > 0
        ? waterCutFilteredData[waterCutFilteredData.length - 1][waterCutColumn]
        : undefined;
  } else if (otherWaterCutFilteredData.length > 0) {
    otherWaterCutFilteredData.sort((a, b) => a._index - b._index);
    currentWaterCut =
      otherWaterCutFilteredData.length > 0
        ? otherWaterCutFilteredData[otherWaterCutFilteredData.length - 1][
            otherWaterCutColumn
          ]
        : undefined;
  }

  console.log('Logging out the current water cut');
  console.log(currentWaterCut);
  currentWaterCut = currentWaterCut.toFixed(2) + '-%';

  const gorColumn = ' GOR (SCF/bbls) ';
  const gorFilteredData = data.filter((row) => row[gorColumn] !== undefined);
  let currentGor = 0;

  const otherGorColumn = 'GOR';
  const otherGorFilteredData = data.filter(
    (row) => row[otherGorColumn] !== undefined
  );

  if (gorFilteredData.length > 0) {
    gorFilteredData.sort((a, b) => a._index - b._index);

    currentGor =
      gorFilteredData.length > 0
        ? gorFilteredData[gorFilteredData.length - 1][gorColumn]
        : undefined;

    currentGor = currentGor.toFixed(2) + '-scf/bbls';
  } else if (otherGorFilteredData.length > 0) {
    otherGorFilteredData.sort((a, b) => a._index - b._index);
    currentGor =
      otherGorFilteredData.length > 0
        ? otherGorFilteredData[otherGorFilteredData.length - 1][otherGorColumn]
        : undefined;
    currentGor = currentGor.toFixed(2) + '-scf/bbls';
  }

  const oilRateColumn = ' Oil production (bbls) ';
  const oilRateFilteredData = data.filter(
    (row) => row[oilRateColumn] !== undefined
  );
  let currentOilRate = 0;

  const otherOilRateColumn = 'Oil';
  const otherOilRateFilteredData = data.filter(
    (row) => row[otherOilRateColumn] !== undefined
  );

  if (oilRateFilteredData.length > 0) {
    oilRateFilteredData.sort((a, b) => a._index - b._index);

    currentOilRate =
      oilRateFilteredData.length > 0
        ? oilRateFilteredData[oilRateFilteredData.length - 1][oilRateColumn]
        : undefined;
    currentOilRate = currentOilRate.toFixed(2) + '-bbl';
  } else if (otherOilRateFilteredData.length > 0) {
    otherOilRateFilteredData.sort((a, b) => a._index - b._index);

    currentOilRate =
      otherOilRateFilteredData.length > 0
        ? otherOilRateFilteredData[otherOilRateFilteredData.length - 1][
            otherOilRateColumn
          ]
        : undefined;

    currentOilRate = currentOilRate.toFixed(2) + '-bbl';
  }

  res.json({
    currentCummulative,
    currentWaterCut,
    currentGor,
    currentOilRate,
  });
  // } else {
  //   res.send('No files found in the directory');
  // }
});

module.exports = router;
