import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token)
        return res
            .status(401)
            .json({ message: "Unauthorized / Please login first" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.userRole = decoded.userRole;
        req.userID = decoded.userID;
        req.email = decoded.email;
        next();
    });
};