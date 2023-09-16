import express from "express";
import {
    makeSales,
    ticketHistory
} from "../Controlers/salesController.js";
import { authenticateToken } from "../Middleware/JWT.js";

export const salesRoutes = express.Router();

salesRoutes.get("/purchase-history/:customerID", authenticateToken, ticketHistory);
salesRoutes.post("/purchase-ticket", authenticateToken, makeSales);
