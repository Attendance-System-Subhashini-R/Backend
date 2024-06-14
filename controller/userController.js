import connection from "../db.mjs";
import {
  activeUser,
  createuserTable,
  getUserbyid,
  insert,
} from "../queries/userQuery.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createUserTable = async () => {
  try {
    await connection.execute(createuserTable);
    console.log("Users table created or already exists.");
  } catch (error) {
    console.error("Error creating users table:", error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt_rounds = 10;
    let hash = await bcrypt.hash(password, salt_rounds);

    const result = await connection.execute(insert, [name, email, hash]);

    if (result) {
      return res.status(200).json({
        status: true,
        message: "User created successfully",
      });
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(400).json({
      status: true,
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let [userRecord] = await connection.execute(activeUser, [email]);

    if (userRecord[0].length == 0) {
      return res.status(400).json({
        status: false,
        message: "User doesn't exist",
      });
    }

    console.log(userRecord[0].password);

    const isPasswordValid = await bcrypt.compare(
      password,
      userRecord[0].password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: false, message: "Password is invalid" });
    } else {
      const token = jwt.sign(
        { id: userRecord[0].id, email: userRecord[0].email },
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
      );

      if (token) {
        return res.status(200).json({
          status: true,
          token,
        });
      }
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(400).json({
      status: true,
      message: error.message,
    });
  }
};

export { createUserTable, createUser, userLogin };
