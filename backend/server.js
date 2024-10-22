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
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
