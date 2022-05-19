import { Router } from "express";
import {
  ValidateRegInfo,
  ValidateUpdateInfo,
} from "#Middlewares/index.middleware.js";

import {
  CreateUser,
  GetUser,
  UpdateUser,
  DeleteUser,
} from "#Controllers/user.controller.js";

const Route = Router();

// User registration
Route.post("/register", ValidateRegInfo, CreateUser);

// Get, Update and Delete user profile
Route.route("/:username")
  .get(GetUser)
  .patch(ValidateUpdateInfo, UpdateUser)
  .delete(DeleteUser);

export default Route;
