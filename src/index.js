const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send({message: 'Welcome to API for Student Management System'});
});

const authRoutes = require('./routes/auth.route.js');
app.use('/api/auth', authRoutes);


const studentRoutes = require('./routes/student.route.js');
app.use('/api/students', studentRoutes);

module.exports = app;
