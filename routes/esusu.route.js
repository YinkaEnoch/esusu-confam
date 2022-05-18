import { Router } from "express";
import validateRegInfo from "#Middlewares/register.middleware.js";
import { CreateUser } from "#Controllers/register.controller.js";

const Route = Router();

// User registration
Route.post("/register", validateRegInfo, CreateUser);

export default Route;
