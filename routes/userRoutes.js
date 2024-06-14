import express from "express";
import {
  createUser,
  createUserTable,
  userLogin,
} from "../controller/userController.js";

// Create a new router instance using Express
const router = express.Router();

// create routes for every request using different methods
router.post("/table", createUserTable);
router.post("/createuser", createUser);
router.post("/login", userLogin);

export default router;
