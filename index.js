import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import esusuRoute from "./routes/esusu.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

// API Route
app.use("/api/v1/esusu/", esusuRoute);

app.use((req, res) => {
  res
    .status(404)
    .json({ code: 1, type: "ENOTFOUND", message: "Route does not exist!!" });
});

app.listen(PORT, () =>
  console.log(`App is running on port ${PORT} [${new Date().toString()}]`)
);
