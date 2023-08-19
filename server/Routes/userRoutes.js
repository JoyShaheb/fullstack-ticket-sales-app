import express from "express";
import { loginUser, createUser } from "../Controllers/userController.js";

export const UserRouter = express.Router();

UserRouter.post("/register", createUser);
UserRouter.post("/login", loginUser);
