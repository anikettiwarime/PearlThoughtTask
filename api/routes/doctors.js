const express = require('express');
const router = express.Router();
const { getDoctors, createDoctor, getDoctorById, updateDoctor, deleteDoctor} = require('../controllers/doctors');

// Define doctor-related routes and their handlers

router.
    get('/', getDoctors).
    get('/:id', getDoctorById).
    post('/', createDoctor).
    patch('/:id', updateDoctor).
    delete('/:id', deleteDoctor);

module.exports = router;