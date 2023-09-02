import { EventModel } from "../Models/EventModel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

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
        const { token } = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            if (decodedToken.role !== "admin") {
                return res
                    .status(400)
                    .json({
                        message:
                            "You are not authorized, please login as a Admin to create events",
                    });
            }

            const newEvent = await EventModel.create({
                ...req.body,
            });
            res.status(200).json({ message: "Event created successfully", newEvent });
        });
    } catch (err) {
        res.status(500).json({ message: "something went wrong", err });
    }
};


export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            if (decodedToken.role !== "admin") {
                return res.status(400).json({
                    message: "You are not authorized to update events. Please log in as an admin.",
                });
            }

            const {
                title,
                description,
                date,
                location,
                image,
                price,
                type
            } = req.body;

            const updatedEvent = await EventModel.findByIdAndUpdate(
                id,
                {
                    title,
                    description,
                    date,
                    location,
                    image,
                    price,
                    type
                },
                { new: true }
            );

            if (!updatedEvent) {
                return res.status(404).json({ message: "Event not found" });
            }

            res.json({ message: "Successfully updated Event", data: updatedEvent });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            if (decodedToken.role !== "admin") {
                return res.status(400).json({
                    message: "You are not authorized to delete events. Please log in as an admin.",
                });
            }

            const deletedEvent = await EventModel.findByIdAndRemove(id);

            if (!deletedEvent) {
                return res.status(404).json({ message: "Event not found" });
            }

            res.json({ message: "Event deleted successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
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

// bookmarked events
export const getMultipleEvents = async (req, res) => {
    try {
        // Retrieve the event IDs from the request body or query parameters
        const { eventIDs } = req.body; // Assuming eventIDs is an array of event IDs

        // Use the retrieved event IDs to fetch the corresponding events
        const events = await EventModel.find({ id: { $in: eventIDs } });

        // Return the found events
        res.status(200).json({ message: "Multiple Events found", data: events });
    } catch (err) {
        res.status(500).json({ message: "Server Error", log: err.message });
    }
};