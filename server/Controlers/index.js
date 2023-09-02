import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => console.log("Connected to DB"))
    .catch((err) => console.log(err, "Failed to connect to mongo DB"));

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});