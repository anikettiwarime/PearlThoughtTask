import { Schedule } from '../models/schedule.model.js'
import { Doctor } from '../models/doctor.model.js'

const getAllSchedule = async (req, res) => {
    try {
        const allappointments = await Schedule.find();
        console.log(typeof (allappointments));
        res.status(200).json(allappointments)
    } catch (error) {
        console.log(error.message);
        res.json({ msg: error.message })
    }
}

const getScheduleById = async (req, res) => {
    try {
        const Id = req.params.id
        const ScheduleSpecific = await Schedule.findById(Id)
        console.log(ScheduleSpecific.startTime.toTimeString());
        res.status(200).json(ScheduleSpecific)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

const AddSchedule = async (req, res) => {
    const { doctorId, AppointmentId, patientName, startTime, endTime } = req.body;
    const data = req.body
    const newSchedule = new Schedule(data);
    try {
        const doctor = await Doctor.findById(doctorId)
        if (!doctor) {
            res.status(404).json({ msg: "Doctor Not Found" });
        }
        if (doctor.numOfAppointments > 0) {
            const newLeft = doctor.numOfAppointments - 1;
            const startDateTime = new Date(startTime);
            const endDateTime = new Date(endTime)
            console.log();
            if (startDateTime.getDay() == 0) {
                res.json({ msg: "No doctor work on sunday" })
            }
            const doctorSchedule = await Schedule.find({ doctorId: doctor._id });

            doctorSchedule.forEach((docI) => {
                if ((startDateTime > docI.startTime && startDateTime < docI.endTime) || (endDateTime > docI.startTime && endDateTime < docI.endTime) || (startDateTime < docI.startTime && endDateTime > docI.endTime)) {
                    res.json({ msg: "No Time for this appointment" })
                }
            })

            await Doctor.findByIdAndUpdate(doctor._id, { numOfAppointments: newLeft }, { new: true })

        }
        else {
            res.json({ msg: "No Appointment Slots Left" })
        }
        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

const UpdateSchedule = async (req, res) => {
    const Id = req.params.id
    const edits = req.body
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(Id, edits, { new: true })
        res.status(200).json(updatedSchedule)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

const DeleteSchedule = async (req, res) => {
    const Id = req.params.id
    try {
        await Schedule.findByIdAndDelete(Id)
        res.status(200).json({ msg: "Deleted" })
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export {
    getAllSchedule,
    getScheduleById,
    UpdateSchedule,
    DeleteSchedule,
    AddSchedule
}