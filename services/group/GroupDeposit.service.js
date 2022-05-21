import { Group } from "#Models/index.js";

const GroupDeposit = async ({ username, groupName, amount }) => {
  // Fetch group
  const group = await Group.findOne({ groupName });

  if (!group)
    return {
      code: 1,
      type: "ERR",
      message: `Group [${groupName}] does not exist`,
    };

  // Check if user belong to group
  const userInfo = group.members.get(username);
  console.log(userInfo);
  if (!userInfo)
    return {
      code: 1,
      type: "ENULL",
      message: `User [${username}] does not belong to the group [${groupName}}]`,
    };

  // Check if amount is >= group's savingsAmount
  if (amount < group.savingsAmount)
    return {
      code: 1,
      type: "ERR",
      message: "Deposit amount is lesser then the required savings amount",
    };

  // Add user's savings
  const joinedOn = userInfo.get("joinedOn");
  const usersDeposit = userInfo.get("deposits");
  //{date: Date.now(), amount}];

  group.members.set(username, {
    joinedOn: joinedOn,
    deposits: [...usersDeposit, { date: Date.now(), amount }],
  });
  await group.save();

  return {
    code: 0,
    type: "OK",
    message: `Deposit of [${amount}] has been successfully deposited in the group [${groupName}]`,
  };
};

export default GroupDeposit;
