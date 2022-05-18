import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import esusuRoute from "./routes/esusu.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// API Route
app.use("/api/v1/esusu/", esusuRoute);

app.listen(PORT, () =>
  console.log(`App is running on port ${PORT} [${new Date().toString()}]`)
);
