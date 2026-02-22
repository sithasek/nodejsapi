const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    studentStatus: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    DateOfBirth: {
        type: Date,
        required: true,
    },
    photo: {
        type: Buffer,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
