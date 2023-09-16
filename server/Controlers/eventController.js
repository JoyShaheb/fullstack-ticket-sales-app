import { EventModel } from "../Models/EventModel.js";

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
    if (req.userRole !== "admin") {
      return res.status(400).json({
        message:
          "You are not authorized, please log in as an Admin to update events",
      });
    }

    const { title, description, date, location, image, price, type } = req.body;

    const { id } = req.params; // Assuming you're passing the event ID in the request parameters

    const updatedEvent = await EventModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        location,
        image,
        price,
        type,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Successfully updated Event", data: updatedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(400).json({
        message:
          "You are not authorized, please login as an Admin to delete events",
      });
    }

    const { id } = req.params;

    const deletedEvent = await EventModel.findByIdAndRemove(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchEvent = async (req, res) => {
  try {
    const { search } = req.query;
    const events = await EventModel.find({
      title: { $regex: search, $options: "i" },
    });
    res.status(200).json({ message: "searched event", events });
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
    const events = await EventModel.find({ _id: { $in: eventIDs } });

    // Return the found events
    res.status(200).json({ data: events });
  } catch (err) {
    res.status(500).json({ message: "Server Error", log: err.message });
  }
};
