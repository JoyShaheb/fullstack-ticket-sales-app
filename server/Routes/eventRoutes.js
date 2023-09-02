import express from "express";
import {
    getOneEvent,
    createEvent,
    deleteEvent,
    getAllEvents,
    updateEvent,
    searchEvent,
    getMultipleEvents
} from "../Controlers/eventController.js";

export const EventRoutes = express.Router();

EventRoutes.get("/get-all-events", getAllEvents);
EventRoutes.get("/get-one-event/:id", getOneEvent);
EventRoutes.post("/create-event", createEvent);
EventRoutes.put("/update-event/:id", updateEvent);
EventRoutes.delete("/delete-event/:id", deleteEvent);
EventRoutes.get("/search-events", searchEvent);
EventRoutes.post("/multiple-events", getMultipleEvents);