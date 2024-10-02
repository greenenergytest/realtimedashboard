const express = require('express');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const uploadDirectory = path.join(__dirname, '../../uploads');
const utilityFunctions = require('../../utils/utilities');

// //get the most recent file
// function getMostRecentFile(dir) {
//   const files = fs.readdirSync(dir);

//   //Map the files to an array of objects with file names and their stats
//   const fileStats = files.map((file) => {
//     const filePath = path.join(dir, file);
//     const stats = fs.statSync(filePath);

//     return { file, mtime: stats.mtime };
//   });

//   //sort the array by modification time in descending order
//   fileStats.sort((a, b) => b.mtime - a.mtime);

//   //Return the most recent file's name or undefined if the directory is empty)
//   return fileStats.length > 0 ? fileStats[0].file : undefined;
// }
function isArrayFilledWithUndefined(arr) {
  return arr.every((element) => element === undefined);
}

router.post('/getCardData', (req, res) => {
  console.log('in getCard data');
  const { sheetName } = req.body;
  const mostRecentFile = utilityFunctions.getMostRecentFile(uploadDirectory);

  //getMostRecentFile(uploadDirectory);

  if (mostRecentFile) {
    const workbook = xlsx.readFile(`${uploadDirectory}/${mostRecentFile}`);
    const worksheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(worksheet);

    // console.log('logging the excel data');
    // console.log(data);

    const FTHPColumn = 'FTHP';
    //extract column data
    // const columnData = data.map((row) => row[FTHPColumn]);
    const fthpFilteredData = data.filter(
      (row) => row[FTHPColumn] !== undefined
    );

    //sort the filtered data by index to get the most recent value
    fthpFilteredData.sort((a, b) => a._index - b._index);

    //get the most recent value of the column
    //const currentFthp = fthpFilteredData.length > 0? fthpFiltered

    // console.log('logging column data');
    // console.log(columnData);

    //NOTE: COMMENTED SUM AND AVERAGE FTHP
    //Calculate the sum of the column data
    //const sum = calculateSum(columnData);
    // console.log('logging sum of column data');
    // console.log(sum);

    //calculate the average FTHP
    //const averageFTHP = sum / columnData.length;

    const currentFTHP =
      fthpFilteredData.length > 0
        ? fthpFilteredData[fthpFilteredData.length - 1][FTHPColumn]
        : undefined;

    const chokeColumn = 'Choke';
    // next couple of line to get last value for choke
    const chokeFilteredData = data.filter(
      (row) => row[chokeColumn] !== undefined
    );

    // sort the filtered data by index
    chokeFilteredData.sort((a, b) => a._index - b._index);

    // Get the most recent value of the column
    const currentChoke =
      chokeFilteredData.length > 0
        ? chokeFilteredData[chokeFilteredData.length - 1][chokeColumn]
        : undefined;

    const condensateRateColumn = 'Condensate rate';

    const condensateRateFilteredData = data.filter(
      (row) => row[condensateRateColumn] !== undefined
    );

    condensateRateFilteredData.sort((a, b) => a._index - b._index);

    const currentCondensateRate =
      condensateRateFilteredData.length > 0
        ? condensateRateFilteredData[condensateRateFilteredData.length - 1][
            condensateRateColumn
          ]
        : undefined;

    //extract column data
    // const condensateRateColumnData = data.map(
    //   (row) => row[condesateRateColumn]
    // );
    // console.log('logging column data');
    // console.log(condensateRateColumnData);

    //Calculate the sum of the column data
    // const sumCondensateRate = calculateSum(condensateRateColumnData);
    // console.log('logging sum of column data');
    // console.log(sumCondensateRate);

    //calculate the average condensate rate
    // const averageCondensateRate =
    //sumCondensateRate / condensateRateColumnData.length;

    // Define the column name for gas rate
    const gasRateColumn = 'Gas rate';

    // Filter out rows where gas rate is not undefined and skip the second row
    const gasRateFilteredData = data
      .slice(2)
      .filter((row) => row[gasRateColumn] !== undefined);

    // Sort the data by the '_index' key to get the most recent
    gasRateFilteredData.sort((a, b) => a[0] - b[0]); // Assuming '_index' is the first column

    // Get the most recent gas rate value
    const currentGasRate =
      gasRateFilteredData.length > 0
        ? gasRateFilteredData[gasRateFilteredData.length - 1][gasRateColumn]
        : undefined;

    //extract column data
    //const gasRateColumnData = data.map((row) => row[gasRateColumn]);
    // console.log('logging column data');
    // console.log(gasRateColumnData);

    //Calculate the sum of the column data
    //const sumGasRate = calculateSum(gasRateColumnData);
    // console.log('logging sum of column data');
    // console.log(sumGasRate);

    //calculate the average gas rate
    //const averageGasRate = sumGasRate / gasRateColumnData.length;

    const waterCutColumn = 'WC';
    let currentWaterCut = 0;
    const waterCutFilteredData = data
      .slice(2)
      .filter((row) => row[waterCutColumn] !== undefined);

    //extract column data
    // const waterCutColumnData = data.map((row) => row[waterCutColumn]);
    // console.log('logging water column data');
    // console.log(waterCutColumnData);
    //console.log('logging waterCutColumnData');
    // console.log(waterCutColumnData);

    if (waterCutFilteredData.length > 0) {
      waterCutFilteredData.sort((a, b) => a._index - b._index);
      currentWaterCut =
        waterCutFilteredData.length > 0
          ? waterCutFilteredData[waterCutFilteredData.length - 1][
              waterCutColumn
            ]
          : undefined;
    } else {
      const waterCutColumn = 'Water Cut';
      const waterCutFilteredData = data
        .slice(2)
        .filter((row) => row[waterCutColumn] !== undefined);
      waterCutFilteredData.sort((a, b) => a._index - b._index);
      currentWaterCut =
        waterCutFilteredData.length > 0
          ? waterCutFilteredData[waterCutFilteredData.length - 1][
              waterCutColumn
            ]
          : undefined;
    }
    // if (!isArrayFilledWithUndefined(waterCutColumnData)) {
    //   //Calculate the sum of the column data
    //   const sumWaterCut = calculateSum(waterCutColumnData);
    //   // console.log('logging sum of column data');
    //   // console.log(sumWaterCut);

    //   //calculate the average water cut
    //   //averageWaterCut = sumWaterCut / waterCutColumnData.length;
    // } else {
    //   const waterCutColumn = 'Water Cut';

    //   //extract column data
    //   const waterCutColumnData = data.map((row) => row[waterCutColumn]);
    //   // console.log('logging water column data');
    //   // console.log(waterCutColumnData);

    //   const sumWaterCut = calculateSum(waterCutColumnData);
    //   // console.log('logging sum of column data');
    //   // console.log(sumWaterCut);

    //   //calculate the average water cut
    //   //averageWaterCut = sumWaterCut / waterCutColumnData.length;
    // }

    const gasOilRatioColumn = 'GOR';
    const gasOilRatioFilteredData = data
      .slice(2)
      .filter((row) => row[gasOilRatioColumn] !== undefined);
    gasOilRatioFilteredData.sort((a, b) => a._index - b._index);
    currentGasOilRatio =
      gasOilRatioFilteredData.length > 0
        ? gasOilRatioFilteredData[gasOilRatioFilteredData.length - 1][
            gasOilRatioColumn
          ]
        : undefined;
    //extract column data
    // const gasOilRatioColumnData = data.map((row) => row[gasOilRatioColumn]);
    // console.log('logging GOR column data');
    // console.log(gasOilRatioColumnData);

    //Calculate the sum of the column data
    //const sumGasOilRatio = calculateSum(gasOilRatioColumnData);
    // console.log('logging sum of column data');
    // console.log(sumGasOilRatio);

    //calculate the average gor
    //const averageGasOilRatio = sumGasOilRatio / gasOilRatioColumnData.length;

    const condensateCummColumn = 'Condensate Cumm';
    // next couple of line to get last value for choke
    const condensateCummFilteredData = data.filter(
      (row) => row[condensateCummColumn] !== undefined
    );

    // sort the filtered data by index to get the most recent value
    condensateCummFilteredData.sort((a, b) => a._index - b._index);

    // Get the most recent value of the column
    const currentCondensateCumm =
      condensateCummFilteredData.length > 0
        ? condensateCummFilteredData[condensateCummFilteredData.length - 1][
            condensateCummColumn
          ]
        : undefined;

    const oilRateColumn = 'Oil rate';
    const oilRateFilteredData = data.filter(
      (row) => row[oilRateColumn] !== undefined
    );

    oilRateFilteredData.sort((a, b) => a._index - b._index);
    const currentOilRate =
      oilRateFilteredData.length > 0
        ? oilRateFilteredData[oilRateFilteredData.length - 1][oilRateColumn]
        : undefined;

    //extract column data
    //const oilRateColumnData = data.map((row) => row[oilRateColumn]);
    // console.log('logging oil rate column data');
    // console.log(oilRateColumnData);

    //Calculate the sum of the column data
    //const sumOilRate = calculateSum(oilRateColumnData);
    // console.log('logging sum of column data');
    // console.log(sumOilRate);

    //calculate the average gor
    //const averageOilRate = sumOilRate / oilRateColumnData.length;

    res.json({
      currentFTHP,
      currentChoke,
      currentCondensateRate,
      currentGasRate,
      currentWaterCut,
      currentGasOilRatio,
      currentCondensateCumm,
      currentOilRate,
    });
  } else {
    res.send('No files found in the directory');
  }
});

// Function to calculate the sum of an array
function calculateSum(array) {
  let sum = 0;
  for (const item of array) {
    // Convert string values to numbers if possible
    const value = Number(item);
    // Check if the value is not NaN and not undefined
    if (!isNaN(value) && value !== undefined) {
      sum += value;
    }
  }
  return sum;
}
module.exports = router;
