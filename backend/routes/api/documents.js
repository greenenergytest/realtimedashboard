const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const uploadDirectory = path.join(__dirname, '../../uploads');

router.post('/getDocuments', (req, res) => {
  try {
    console.log('in get documents');
    console.log(uploadDirectory);
    const files = fs.readdirSync(uploadDirectory);
    console.log('Files', files);
    res.json({ files });
  } catch (err) {
    console.error('Error reading directory:', err);
  }
});

router.post('/deleteDocument', (req, res) => {
  try {
    console.log(req.body);
    const { fileName } = req.body;
    console.log('Deleting file:', fileName);
    const filePath = path.join(uploadDirectory, fileName);
    fs.unlinkSync(filePath);
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('Error deleting file:', err);
    res.status(500).send('Error deleting file');
  }
});

router.get('/download/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadDirectory, filename);
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  } catch (err) {
    console.error('Error downloading file:', err);
    res.status(500).send('Error downloading file');
  }
});

// router.post('/getDocumentsLink', (req, res) => {
//     const data = fs.readFileSync('data.json', 'utf8')
// });

module.exports = router;
