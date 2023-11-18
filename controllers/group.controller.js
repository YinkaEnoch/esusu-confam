import {
  GetGroup as GetGroupService,
  GetAllGroups as GetAllGroupsService,
} from "#Services/group/GetGroup.service.js";
import CreateGroupService from "#Services/group/CreateGroup.service.js";
import JoinGroupService from "#Services/group/JoinGroup.service.js";
import GroupDepositService from "#Services/group/GroupDeposit.service.js";
import respService from "#Utils/responseService.util.js";

const CreateGroup = async (req, res) => {
  const resp = await CreateGroupService(req.body.validated);
  respService({ resp, res, statusCode: 201 });
};

const GetGroup = async (req, res) => {
  console.log(typeof req.query.members);
  const resp = await GetGroupService(req.params.groupName, req.query.members);
  respService({ resp, res, statusCode: 200 });
};

const GetAllGroups = async (req, res) => {
  const resp = await GetAllGroupsService();
  respService({ resp, res, statusCode: 200 });
};

const JoinGroup = async (req, res) => {
  const resp = await JoinGroupService({
    groupName: req.params.groupName,
    username: req.body.validated.username,
  });
  respService({ resp, res, statusCode: 200 });
};

const GroupDeposit = async (req, res) => {
  const resp = await GroupDepositService({
    groupName: req.params.groupName,
    username: req.body.validated.username,
    amount: req.body.validated.amount,
  });
  respService({ resp, res, statusCode: 201 });
};

const UpdateGroup = async (req, res) => {};
const DeleteGroup = async (req, res) => {};

export {
  CreateGroup,
  GetGroup,
  GetAllGroups,
  JoinGroup,
  GroupDeposit,
  UpdateGroup,
  DeleteGroup,
};
