import express from "express";
import {
  createUser,
  createUserTable,
  userLogin,
} from "../controller/userController.js";

const router = express.Router();

router.post("/table", createUserTable);
router.post("/createuser", createUser);
router.post("/login", userLogin);

export default router;
