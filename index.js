import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Working..."));

app.listen(PORT, () =>
  console.log(`App is running on port ${PORT} [${new Date().toString()}]`)
);
