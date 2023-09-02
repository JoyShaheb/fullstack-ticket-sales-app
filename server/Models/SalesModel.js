import mongoose from "mongoose";
const SalesSchema = new mongoose.Schema({});

export const SalesModel = mongoose.model("Sales", SalesSchema);