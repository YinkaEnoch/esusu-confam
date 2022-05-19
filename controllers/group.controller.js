import {
  CreateGroup as CreateGroupService,
  GetGroup as GetGroupService,
  GetAllGroups as GetAllGroupsService,
  JoinGroup as JoinGroupService,
} from "#Services/group.service.js";
import respService from "#Utils/responseService.util.js";

const CreateGroup = async (req, res) => {
  const resp = await CreateGroupService(req.body.validated);
  respService({ resp, res, statusCode: 201 });
};

const GetGroup = async (req, res) => {
  const resp = await GetGroupService(req.params.groupName);
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
const UpdateGroup = async (req, res) => {};
const DeleteGroup = async (req, res) => {};

export {
  CreateGroup,
  GetGroup,
  GetAllGroups,
  JoinGroup,
  UpdateGroup,
  DeleteGroup,
};
