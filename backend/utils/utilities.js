const fs = require('fs');
const path = require('path');

const getMostRecentFile = (dir) => {
  const files = fs.readdirSync(dir);

  //Map the files to an array of objects with file names and their stats
  const fileStats = files.map((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    return { file, mtime: stats.mtime };
  });

  //sort the array by modification time in descending order
  fileStats.sort((a, b) => b.mtime - a.mtime);

  //Return the most recent file's name or undefined if the directory is empty
  return fileStats.length > 0 ? fileStats[0].file : undefined;
};

module.exports = {
  getMostRecentFile,
};
