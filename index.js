import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerConfig = require("./swagger.json");
import UsersRoute from "./routes/users.route.js";
import GroupsRoute from "./routes/groups.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

// Swagger
const swaggerSpec = swaggerJSDoc(swaggerConfig);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// API Route
app.use("/api/v1/esusu/users/", UsersRoute);
app.use("/api/v1/esusu/groups/", GroupsRoute);

app.use((req, res) => {
  res
    .status(404)
    .json({ code: 1, type: "ENOTFOUND", message: "Route does not exist!!" });
});

app.use((err, req, res) => {
  res
    .status(err.statusCode || 500)
    .json({ code: 1, type: "ERR", message: err.message || "Server error" });
});

app.listen(PORT, () =>
  console.log(`App is running on port ${PORT} [${new Date().toString()}]`)
);
