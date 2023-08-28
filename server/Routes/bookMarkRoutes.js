import express from "express";
import {
  saveToBookMark,
  getAllBookMarks,
} from "../Controllers/bookMarkController.js";

export const BookMarkRoutes = express.Router();

BookMarkRoutes.post("/save-to-bookmark", saveToBookMark);
BookMarkRoutes.get("/get-bookmarks", getAllBookMarks);
