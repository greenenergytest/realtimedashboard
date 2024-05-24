const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');
const fileRoutes = require('./routes/api/file');
const graphDataRoutes = require('./routes/api/graphData');

const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
//const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

// const generateJWTSecret = () => {
//   return crypto.randomBytes(32).toString('hex');
// };

// const JWT_SECRET = generateJWTSecret();

// console.log('JWT Secret:', JWT_SECRET);

//allow requests from any origin
app.use(cors());

const DB_URI = process.env.MONGODB_URI;
// make the connection to db
// on success return successful string
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

app.listen(port, () => {
  console.log(`Server is listening at htpp://localhost:${port}`);
});
//  => {
//     res.send(userRoutes)
// })
