import {
  CreateUser as CreateUserService,
  GetUser as GetUserService,
} from "#Services/register.service.js";

const CreateUser = async (req, res) => {
  const resp = await CreateUserService(req.body.validated);

  if (resp.code == 1) return res.status(500).json({ ...resp });

  res.status(201).json({ ...resp });
};

const GetUser = async (req, res) => {
  const resp = GetUserService(req.body.validated.username);

  if (resp.code == 1) return res.status(500).json({ ...resp });

  res.status(201).json({ ...resp });
};

export { CreateUser, GetUser };
