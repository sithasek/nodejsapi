const Student = require('../models/student.model');
const bcrypt = require('bcrypt');
const jwtProvider = require('../config/jwtProvider');


const createStudent = async (studentData) => {
  try {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(studentData.email)) {
      throw new Error('Invalid email format');
    }
    
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(studentData.password)) {
      throw new Error('Password must be at least 8 characters long and contain both letters and numbers');
    }

    const isNameValid = studentData.firstName !== '' && studentData.lastName !== '';
    if (!isNameValid) {
      throw new Error('First name and last name cannot be empty');
    }

    const isGenderValid = ['Male', 'Female'].includes(studentData.gender);
    if (!isGenderValid) {
      throw new Error('Gender must be Male or Female');
    }

      const isStatusValid = ['Single', 'Married'].includes(studentData.studentStatus);
    if (!isStatusValid) {
      throw new Error('Student status must be Single or Married');
    }

    const isScoreValid = studentData.score >= 0 && studentData.score <= 100;
    if (!isScoreValid) {
      throw new Error('Score must be between 0 and 100');
    }
    const isDateOfBirthValid = new Date(studentData.DateOfBirth) < new Date();
    if (!isDateOfBirthValid) {
      throw new Error('Date of Birth must be in the past');
    }
    const isStudentExist = await Student.findOne({ email: studentData.email });
    if (isStudentExist) {
      throw new Error('Student with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(studentData.password, 10);
    studentData.password = hashedPassword;   
    
    const newStudent = new Student(studentData);
    await newStudent.save();
    return newStudent;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

const getAllStudents = async () => {
  try {
    // const Student = require('../models/student.model');
    const students = await Student.find();
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

const getStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    throw error;
  }
};

const findStudentByEmail = async (email) => {
  try {
    const student = await Student.findOne({ email });
    return student;
  } catch (error) {
    console.error('Error finding student by email:', error);
    throw error;
  }
};

const updateStudent = async (studentId, updateData) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true });
    return updatedStudent;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

const deleteStudent = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }   await Student.findByIdAndDelete(studentId);
    return { message: 'Student deleted successfully' };
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

const getStudentByEmail = async (email) => {
  try {
    const student = await Student.findOne({ email });
    return student;
  } catch (error) {
    console.error('Error fetching student by email:', error);
    throw error;
  }
};

const getStudentProfileByToken = async (token) => {
  try {
    const studentId = jwtProvider.getStudentIdFromToken(token);
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  } catch (error) {
    console.error('Error fetching student profile by token:', error);
    throw error;
  }
};


module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  findStudentByEmail,
  updateStudent,
  deleteStudent,
  getStudentByEmail,
  getStudentProfileByToken,
};
