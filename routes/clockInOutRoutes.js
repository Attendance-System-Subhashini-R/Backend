import express from "express";
import {
  createClockTable,
  createInOut,
  getAllClockData,
  updateInOut,
} from "../controller/clockInOutController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/clock-table", createClockTable);
router.post("/create-time", authenticateToken, createInOut);
router.get("/getall-times", authenticateToken, getAllClockData);
router.patch("/update-time", authenticateToken, updateInOut);
export default router;
