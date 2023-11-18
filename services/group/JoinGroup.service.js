import { Group, User } from "#Models/index.js";
import SpaceToHypen from "../../utils/SpaceToHypen.util.js";

const JoinGroup = async ({ username, groupName }) => {
  try {
    username = SpaceToHypen(username);

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
    console.log(e);
    return { code: 1, type: "ERR", message: e };
  }
};

export default JoinGroup;
