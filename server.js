import express, { json } from "express";
import user from "./routes/userRoutes.js";
import attendance from "./routes/clockInOutRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";

// initialize the express to app variable
const app = express();

// Assign the port number from environment variables if available, otherwise default to 5000
const PORT = process.env.PORT || 5000;

// middlewares for processing requests
app.use(json());
app.use(bodyParser.json());
app.use(cors());

// Base routes
app.use("/user", user);
app.use("/attendance", attendance);

// listening the server on Port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
