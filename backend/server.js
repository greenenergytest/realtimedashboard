const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');
const fileRoutes = require('./routes/api/file');
// const fileAuthenticationRoutes = require('./routes/api/fileAuthentication');
const graphDataRoutes = require('./routes/api/graphData');
const cardDataRoutes = require('./routes/api/cardData');
const fieldDataRoutes = require('./routes/api/fieldData');
const columnNamesRoutes = require('./routes/api/columnNames');
const problemWellsRoutes = require('./routes/api/problemWells');
const wellGraphRoute = require('./routes/api/wellGraphs');

const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// Health check endpoint
app.use('/healthcheck', (req, res) => {
  res.status(200).send('ok');
});
const DB_URI = process.env.MONGODB_URI;
console.log(DB_URI);
app.use(bodyParser.json());

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(fileUpload());
app.use('/', userRoutes);
app.use('/', profileRoutes);
app.use('/', fileRoutes);
app.use('/', graphDataRoutes);
app.use('/', cardDataRoutes);
app.use('/', columnNamesRoutes);
app.use('/', fieldDataRoutes);
app.use('/', problemWellsRoutes);
app.use('/', wellGraphRoute);
// app.use('/', fileAuthenticationRoutes);

const os = require('os');

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface in interfaces) {
    for (const alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '127.0.0.1'; // Fallback if no local IP found
}

// const localIP = '172.21.240.1';
const localIP = getLocalIpAddress();

app.listen(port, localIP, () => {
  console.log(`Server running at http://${localIP}:${port}/`);
});
