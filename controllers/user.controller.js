import {
  CreateUser as CreateUserService,
  GetUser as GetUserService,
  UpdateUser as UpdateUserService,
  DeleteUser as DeleteUserService,
} from "#Services/user.service.js";

const CreateUser = async (req, res) => {
  const resp = await CreateUserService(req.body.validated);
  respService(resp, res);
};

const GetUser = async (req, res) => {
  const resp = await GetUserService(req.params.username);
  respService(resp, res);
};

const UpdateUser = async (req, res) => {
  const resp = await UpdateUserService({
    username: req.params.username,
    ...req.body.validated,
  });
  respService(resp, res);
};

const DeleteUser = async (req, res) => {
  const resp = await DeleteUserService(req.params.username);
  respService(resp, res);
};

const respService = (resp, res) => {
  if (resp.code == 1) return res.status(500).json({ ...resp });

  res.status(200).json({ ...resp });
};

export { CreateUser, GetUser, UpdateUser, DeleteUser };
