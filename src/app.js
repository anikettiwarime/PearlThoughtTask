import express from 'express';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

const router = express.Router();

// Import Routes
import { docterRouter } from './routes/doctors.routes.js';
import { appointmentRouter } from './routes/appointments.routes.js';
import { schedulerouter } from './routes/schedules.routes.js';

// Use Routes
app.use('/api/doctors', docterRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/schedule', schedulerouter);

app.get('/', (req, res) => {
    res.send('Server Started Successfully');
});

// Connect to DB
const connecDB = mongoose.connect(`${process.env.MONGO_URI}pearlthoughts`);

app.listen(port, () => {
    connecDB.then(() => {
        console.log('MongoDB Connected');
    }).catch((err) => {
        console.log(err);
    });
    console.log(`Server is running on port ${port}`);
});

export default app;
