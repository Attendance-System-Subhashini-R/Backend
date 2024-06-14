import express from "express";
import {
  createClockTable,
  createInOut,
  getAllClockData,
  updateInOut,
} from "../controller/clockInOutController.js";
import authenticateToken from "../middleware/auth.js";

// Create a new router instance using Express
const router = express.Router();

// create routes for every request using different methods with the authenticate middleware
router.post("/clock-table", createClockTable);
router.post("/create-time", authenticateToken, createInOut);
router.get("/getall-times", authenticateToken, getAllClockData);
router.patch("/update-time", authenticateToken, updateInOut);

export default router;
