import { Group, User } from "#Models/index.js";
import SpaceToHypen from "#Utils/SpaceToHypen.util.js";

const CreateGroup = async ({ admin, isPublic, groupName, savingsAmount }) => {
  try {
    admin = SpaceToHypen(admin);
    groupName = SpaceToHypen(groupName);

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

export default CreateGroup;
