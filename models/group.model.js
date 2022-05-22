import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    savingsAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    admin: {
      type: String,
      required: true,
    },
    members: { type: Map, of: Map },
    numOfMembers: {
      type: Number,
      default: 0,
    },
    maxMember: { type: Number, default: 0 },
  },
  { timestamps: true }
);

GroupSchema.pre("save", async function (next) {
  this.numOfMembers = this.members.size;
  return next();
});

const Group = mongoose.model("Group", GroupSchema);
export default Group;
