import { SalesModel } from "../Models/SalesModel.js";


export const ticketHistory = async (req, res) => {
    const { customerID } = req.params;
    try {
        const history = await SalesModel.find({ customerID });
        res.status(200).json({ message: "Ticket history", data: history });
    } catch (error) {
        res.status(500).json({ message: "Server Error", log: error.message });
    }
};


export const makeSales = async (req, res) => {
    const x = req.body; // array of objects

    try {
        const newSales = await SalesModel.insertMany(x);

        res.status(201).json({ message: "Sale made successfully", data: newSales });
    } catch (error) {
        res.status(500).json({ message: "Server Error", log: error.message });
    }
};

export const refund = async (req, res) => {
    try {
        res.status(200).json({ message: "Refund successful" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", log: error.message });
    }
};