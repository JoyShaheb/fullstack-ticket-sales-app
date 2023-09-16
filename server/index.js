import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./Routes/UserRoute.js";
import { EventRoutes } from "./Routes/eventRoutes.js";
import cookieParser from "cookie-parser";
import { BookMarkRoutes } from "./Routes/bookMarkRoutes.js";
import { salesRoutes } from "./Routes/salesRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => console.log("Connected to DB"))
    .catch((err) => console.log(err, "Failed to connect to mongo DB"));

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use("/api/users/authenticate", UserRouter);
app.use("/api/events", EventRoutes);
app.use("/api/bookmarks", BookMarkRoutes);
app.use("/api/sales", salesRoutes)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});