import express from "express";
import {
  getOneEvent,
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
  searchEvent,
  getMultipleEvents,
} from "../Controlers/eventController.js";
import { authenticateToken } from "../Middleware/JWT.js";

export const EventRoutes = express.Router();

EventRoutes.get("/events", getAllEvents);
EventRoutes.get("/get-one-event/:id", getOneEvent);
EventRoutes.post("/create-event", authenticateToken, createEvent);
EventRoutes.put("/update-event/:id", authenticateToken, updateEvent);
EventRoutes.delete("/delete-event/:id", authenticateToken, deleteEvent);
EventRoutes.get("/search-events", searchEvent);
EventRoutes.get("/get-multiple-events", authenticateToken, getMultipleEvents);
