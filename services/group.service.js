import { Group, User } from "#Models/index.js";

const CreateGroup = async ({ admin, isPublic, groupName, savingsAmount }) => {
  try {
    // Fetch admin
    const user = await User.findOne({ username: admin });

    if (!user)
      return {
        code: 1,
        type: "ERR",
        message: `Group admin [${admin}] does not exist`,
      };

    // Check if group exist
    const group = await Group.findOne({ groupName });

    if (group)
      return {
        code: 1,
        type: "EEXISTS",
        message: `Group name [${groupName}] is already taken`,
      };

    // Create group
    const newGroup = new Group({
      groupName,
      isPublic,
      admin,
      savingsAmount,
      members: { [admin]: { joinedOn: Date.now(), deposits: [] } },
    });
    // Save group
    const savedGroup = await newGroup.save();

    // Add group to user details
    user.groups.push(groupName);
    await user.save();

    return {
      code: 0,
      type: "OK",
      message: "New group successfully created!!",
      data: savedGroup,
    };
  } catch (e) {
    console.log(e);
    return { code: 1, type: "ERR", message: e };
  }
};

const GetGroup = async (groupName) => {
  try {
    const group = await Group.findOne({ groupName }).lean();

    if (!group)
      return {
        code: 1,
        type: "ENULL",
        message: `Group [${groupName}] does not exist`,
      };

    return { code: 0, type: "OK", message: "Group found", data: group };
  } catch (e) {
    return { code: 1, type: "ERR", message: e };
  }
};

const GetAllGroups = async () => {
  try {
    const group = await Group.find({ isPublic: true }).lean();

    if (!group || group < 1)
      return {
        code: 1,
        type: "ENULL",
        message: "No group found!!",
      };

    return { code: 0, type: "OK", message: "Group found", data: group };
  } catch (e) {
    return { code: 1, type: "ERR", message: e };
  }
};

const JoinGroup = async ({ username, groupName }) => {
  try {
    // Fetch User
    const user = await User.findOne({ username });

    if (!user)
      return {
        code: 1,
        type: "ERR",
        message: `User [${username}] does not exist`,
      };

    // Fetch group
    const group = await Group.findOne({ groupName });

    if (!group)
      return {
        code: 1,
        type: "ERR",
        message: `Group [${groupName}] does not exist`,
      };

    // Add group to user details
    user.groups.push(groupName);
    await user.save();

    // Check if user already belong to group
    if (group.members.get(username)) {
      return {
        code: 1,
        type: "EEXISTS",
        message: `User [${username}] already belong to the group [${groupName}}]`,
      };
    }

    // Add user to group
    group.members.set(username, { joinedOn: Date.now(), deposits: [] });
    await group.save();

    return {
      code: 0,
      type: "OK",
      message: `User [${username}] has been successfully added to new group [${groupName}]`,
    };
  } catch (e) {
    return { code: 1, type: "ERR", message: e };
  }
};

export { CreateGroup, GetGroup, GetAllGroups, JoinGroup };
