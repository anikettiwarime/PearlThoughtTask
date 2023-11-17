import express from 'express';
const docterRouter = express.Router();

import { getDoctors, createDoctor, getDoctorById, updateDoctor, deleteDoctor } from '../controllers/doctors.controller.js';

// Define doctor-related routes and their handlers
docterRouter.
    get('/', getDoctors).
    get('/:id', getDoctorById).
    post('/', createDoctor).
    patch('/:id', updateDoctor).
    delete('/:id', deleteDoctor);

export { docterRouter };