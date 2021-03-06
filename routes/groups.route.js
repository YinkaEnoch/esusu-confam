import { Router } from "express";
import {
  ValidateGroupInfo,
  ValidateJoinGroup,
  ValidateGroupDesposit,
} from "#Middlewares/index.middleware.js";
import {
  GetAllGroups,
  CreateGroup,
  GetGroup,
  JoinGroup,
  GroupDeposit,
} from "#Controllers/group.controller.js";

const Route = Router();

// Create group
Route.route("/").get(GetAllGroups).post(ValidateGroupInfo, CreateGroup);

// Get, Update and Delete group
Route.route("/:groupName").get(GetGroup);

// Join a group
Route.post("/:groupName/join", ValidateJoinGroup, JoinGroup);

// Deposit savings
Route.post("/:groupName/deposit", ValidateGroupDesposit, GroupDeposit);

export default Route;
