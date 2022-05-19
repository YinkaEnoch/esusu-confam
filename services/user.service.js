import { User } from "#Models/index.js";

const GetUser = async (username) => {
  try {
    const user = await User.findOne({ username }).lean();

    if (!user)
      return {
        code: 1,
        type: "ENULL",
        message: `User [${username}] does not exist`,
      };

    return { code: 0, type: "OK", message: "User found", data: user };
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

const UpdateUser = async (props) => {
  try {
    const { username, ...info } = props;

    const doc = await User.findOneAndUpdate(
      { username },
      { $set: info },
      { new: true }
    );

    if (!doc)
      return {
        code: 1,
        type: "ENULL",
        message: `User [${username}] does not exist`,
      };

    return {
      code: 0,
      type: "OK",
      message: "User profile successfully updated",
      data: doc,
    };
  } catch (e) {
    return {
      code: 1,
      type: "ERR",
      message: "Failed to update user profile. Try again",
    };
  }
};

const DeleteUser = async (username) => {
  try {
    const doc = await User.findOneAndDelete({ username });

    if (!doc)
      return {
        code: 1,
        type: "ENULL",
        message: `User [${username}] does not exist`,
      };

    return {
      code: 0,
      type: "OK",
      message: "User profile successfully deleted",
      data: doc,
    };
  } catch (e) {
    return {
      code: 1,
      type: "ERR",
      message: "Failed to delete user profile. Try again",
    };
  }
};

export { CreateUser, GetUser, UpdateUser, DeleteUser };
