import { EventModel } from "../Models/EventModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getAllEvents = async (req, res) => {
  try {
    const allEvents = await EventModel.find({});

    res.status(200).json(allEvents);
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err });
  }
};

export const getOneEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const findOneEvent = await EventModel.findOne({ _id: id });
    res.status(200).json(findOneEvent);
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err });
  }
};

export const createEvent = async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(400).json({
        message:
          "You are not authorized, please login as a Admin to create events",
      });
    }
    const newEvent = await EventModel.create({
      ...req.body,
    });
    res.status(200).json({ message: "Event created successfully", newEvent });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err });
  }
};

export const updateEvent = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err });
  }
};

export const deleteEvent = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err });
  }
};

export const searchEvent = async (req, res) => {
  try {
    const { title } = req.body;

    const searchEvent = await EventModel.find({
      title: { $regex: title, $options: "i" },
    });

    res.status(200).json({ message: "searched event", searchEvent });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err });
  }
};
