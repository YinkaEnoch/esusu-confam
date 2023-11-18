import { Group } from "#Models/index.js";

const GetGroup = async (groupName, excludeMembers = false) => {
  try {
    console.log(excludeMembers);
    let exclude = { _id: 0, __v: 0, members: 0 };

    if (excludeMembers === "true") {
      exclude = { _id: 0, __v: 0 };
    }
    const group = await Group.findOne({ groupName }, exclude).lean();

    if (!group)
      return {
        code: 1,
        type: "ENULL",
        message: `Group [${groupName}] does not exist`,
      };

    return { code: 0, type: "OK", message: "Group found", data: group };
  } catch (e) {
    console.log(e);
    return { code: 1, type: "ERR", message: e };
  }
};

const GetAllGroups = async () => {
  try {
    const group = await Group.find(
      { isPublic: true },
      { _id: 0, members: 0, __v: 0 }
    ).lean();

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

export { GetGroup, GetAllGroups };
