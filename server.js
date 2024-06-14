import express, { json } from "express";
import user from "./routes/userRoutes.js";
import attendance from "./routes/clockInOutRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(bodyParser.json());
app.use(cors());

app.use("/user", user);
app.use("/attendance", attendance);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
