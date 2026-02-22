const studentService = require('../services/student.service.js');
const jwtProvider = require('../config/jwtProvider.js');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    const token = jwtProvider.generateToken(student._id);
    student.token = token;
    return res.status(201).send({ token, message: 'Student registered successfully'});
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await studentService.getStudentByEmail(email);
    if (!student) {
      return res.status(401).send({ message: 'email not exists : ' + email });
    }   
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid password' });
    }
    const token = jwtProvider.generateToken(student._id);
    student.token = token;
    return res.status(200).send({ token, message: 'Login successful' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


module.exports = { register, login};

