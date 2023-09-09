import express from "express";
import {
    saveToBookMark,
    getAllBookMarks,
    removeEventFromBookmark,
} from "../Controlers/bookMarkController.js";
import { authenticateToken } from "../Middleware/JWT.js";

export const BookMarkRoutes = express.Router();

BookMarkRoutes.post("/save-to-bookmark", authenticateToken, saveToBookMark);
BookMarkRoutes.get("/get-bookmarks", authenticateToken, getAllBookMarks);
BookMarkRoutes.put("/remove-from-bookmark", authenticateToken, removeEventFromBookmark);