const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller.js');

router.get('/', studentController.getStudentAllStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/profile', studentController.getProfile);

module.exports = router;
