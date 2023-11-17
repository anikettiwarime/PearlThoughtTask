import express from "express";
const schedulerouter = express.Router()
import { getAllSchedule, getScheduleById, UpdateSchedule, DeleteSchedule, AddSchedule } from "../controllers/schedule.controller.js";
 

schedulerouter
    .get("/", getAllSchedule)
    .post("/", AddSchedule)
    .get("/:id", getScheduleById)
    .patch("/:id", UpdateSchedule)
    .delete("/:id", DeleteSchedule);

export { schedulerouter }