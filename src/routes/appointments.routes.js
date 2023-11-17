import express from 'express';
const appointmentRouter = express.Router();

import { getAppointments, createAppointment, getAppointmentById, updateAppointment, deleteAppointment } from '../controllers/appointments.controller.js';


appointmentRouter.
    get('/', getAppointments).
    post('/', createAppointment).
    get('/:id', getAppointmentById).
    put('/:id', updateAppointment).
    delete('/:id', deleteAppointment);


export { appointmentRouter };