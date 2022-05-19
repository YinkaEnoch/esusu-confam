import {
  CreateUser as CreateUserService,
  GetUser as GetUserService,
  UpdateUser as UpdateUserService,
  DeleteUser as DeleteUserService,
} from "#Services/user.service.js";
import respService from "#Utils/responseService.util.js";

const CreateUser = async (req, res) => {
  const resp = await CreateUserService(req.body.validated);
  respService({ resp, res, statusCode: 201 });
};

const GetUser = async (req, res) => {
  const resp = await GetUserService(req.params.username);
  respService({ resp, res, statusCode: 200 });
};

const UpdateUser = async (req, res) => {
  const resp = await UpdateUserService({
    username: req.params.username,
    ...req.body.validated,
  });
  respService({ resp, res, statusCode: 201 });
};

const DeleteUser = async (req, res) => {
  const resp = await DeleteUserService(req.params.username);
  respService({ resp, res, statusCode: 200 });
};

export { CreateUser, GetUser, UpdateUser, DeleteUser };
