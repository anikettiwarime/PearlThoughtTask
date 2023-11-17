import express from 'express';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());

const router = express.Router();

// Import Routes
import { docterRouter } from './routes/doctors.routes.js';
import { appointmentRouter } from './routes/appointments.routes.js';
import { schedulerouter } from './routes/schedules.routes.js';

// Use Routes
router.use('/doctors', docterRouter);
router.use('/appointments', appointmentRouter);
router.use('/schedule', schedulerouter);


app.use('/api', router); // prefix all routes with /api

app.get('/', (req, res) => {
    res.send('Server Started Successfully');
});


// Connect to DB
const connectDB = mongoose.connect(`${process.env.MONGO_URI}/pearlthoughts`);

export { connectDB , app };


