import { User } from "#Models/index.js";

const GetUser = async (username) => {
  try {
    return await User.findOne({ username });
  } catch (e) {
    return { code: 1, type: "ERR", message: e };
  }
};

const CreateUser = async (props) => {
  try {
    const newUser = new User({ ...props });
    const savedUser = await newUser.save();

    return {
      code: 0,
      type: "OK",
      message: "New user successfully created!!",
      data: savedUser,
    };
  } catch (e) {
    return { code: 1, type: "ERR", message: e };
  }
};

export { CreateUser, GetUser };
