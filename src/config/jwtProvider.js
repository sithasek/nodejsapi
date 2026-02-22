const jwt = require('jsonwebtoken');

const SECCRET_KEY = "783264832432bc3y489353c!!@#@#$#%$^%^&&*&*!@##@#!$#$#%$%$$%$%$%$%$*";

const generateToken = (studentId) => { 
    const token = jwt.sign({ studentId }, SECCRET_KEY, { expiresIn: '2h' });
    return token;
}

const getStudentIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECCRET_KEY);
        return decoded.studentId;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = {
  generateToken,
  getStudentIdFromToken
};  

