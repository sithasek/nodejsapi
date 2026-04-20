const studentService = require('../services/student.service');

const getProfile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Received token:', token);
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send({ error: 'Authorization token is missing' });
    }
    const student = await studentService.getStudentProfileByToken(token);
    return res.status(200).send({ student });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getStudentAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    return res.status(200).send({ students });
    } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentService.getStudentById(studentId);
    //return res.status(200).send({ student });
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updateData = req.body;
    const updatedStudent = await studentService.updateStudent(studentId, updateData);
    return res.status(200).send({ student: updatedStudent });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    await studentService.deleteStudent(studentId);
    return res.status(200).send({ message: 'Student deleted successfully' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};



module.exports = {
  getProfile,
  getStudentAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
