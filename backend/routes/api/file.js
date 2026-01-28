const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
const xlsx = require('xlsx');
// const crypto = require('crypto');
const router = express.Router();

// //Create the upload directory if it doesn't exist
// const uploadDirectory = path.join(__dirname, '../../uploads');

// //let crypto_id = crypto.randomUUID();
// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDirectory);
//   },
//   filename: function (req, file, cb) {
//     // crypto_id = crypto.randomUUID();
//     const ext = path.extname(file.originalname);
//     let crypto_id = crypto.randomUUID();
//     //cb(null, file.originalname);
//     cb(null, `${crypto_id}${ext}`);
//   },
// });

// const upload = multer({ storage: storage });

// // Serve static
// router.use('/uploads', express.static(uploadDirectory));

// //Route to handle file upload
// router.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     console.log('files not found');
//     return res.status(400).send('No files were uploaded.');
//   }

//   const storedFileName = req.file.filename;
//   const file = req.files.file;
//   const fileName = file.name;

//   file.mv(`${uploadDirectory}/${file.name}`, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     const workbook = xlsx.readFile(`${uploadDirectory}/${file.name}`);
//     const sheetNames = workbook.SheetNames;
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
//     const columnNames = [];

//     // Loop through all keys in the worksheet
//     for (let key in worksheet) {
//       // Check if the key represents the first row (row 1)
//       if (key[1] === '1' && worksheet.hasOwnProperty(key)) {
//         // Get the column name from the first row
//         const columnName = worksheet[key].v;
//         // Check if the column name is a string
//         if (typeof columnName === 'string') {
//           columnNames.push(columnName);
//         }
//       }
//     }

//     res.json({ id: crypto_id, fileName, columnNames, sheetNames }); // Send column names as response
//   });
// });

// module.exports = router;

// const multer = require('multer');
// const crypto = require('crypto');
// const path = require('path');
// const fs = require('fs');

// const uploadDirectory = path.join(__dirname, '../../uploads');
// if (!fs.existsSync(uploadDirectory)) fs.mkdirSync(uploadDirectory);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDirectory),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const crypto_id = crypto.randomUUID();
//     cb(null, `${crypto_id}${ext}`);
//   },
// });

// const upload = multer({ storage });

// router.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//   res.json({
//     storedFileName: req.file.filename,
//     originalFileName: req.file.originalname,
//   });
// });

// module.exports = router;

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const uploadDirectory = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDirectory)) fs.mkdirSync(uploadDirectory);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirectory),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const crypto_id = crypto.randomUUID();
    cb(null, `${crypto_id}-${file.originalname}`);
  },
});

const upload = multer({ storage }); // ← THIS LINE WAS MISSING

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log('file not found');
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log(req);
  const storedFileName = req.file.filename;
  const originalFileName = req.file.originalname;
  const filePath = req.file.path;
  //const file = req.files.file;
  const fileName = req.file.originalname;

  // Read Excel file
  const workbook = xlsx.readFile(filePath);
  const sheetNames = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheetNames[0]];

  const columnNames = [];

  for (let key in worksheet) {
    if (key.endsWith('1') && worksheet[key]?.v) {
      columnNames.push(worksheet[key].v);
    }
  }

  res.json({
    fileName,
    storedFileName,
    originalFileName,
    columnNames,
    sheetNames,
  });
});
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
  if (!req.files || Object.keys(req.files).length === 0) {
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
