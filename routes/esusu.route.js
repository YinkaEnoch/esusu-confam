import { Router } from "express";
import validateRegInfo from "#Middlewares/register.middleware.js";
import validateUpdateInfo from "#Middlewares/updateUser.middleware.js";
import {
  CreateUser,
  GetUser,
  UpdateUser,
  DeleteUser,
} from "#Controllers/user.controller.js";

const Route = Router();

// User registration
Route.post("/register", validateRegInfo, CreateUser);

// Get, Update and Delete user profile
Route.route("/users/:username")
  .get(GetUser)
  .patch(validateUpdateInfo, UpdateUser)
  .delete(DeleteUser);

export default Route;
