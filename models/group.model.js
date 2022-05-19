import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    searchable: {
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
    members: [String],
  },
  { timestamps: true }
);

// Push admin into the members list
GroupSchema.pre("save", function (next) {
  this.members.push(this.admin);
  next();
});
// Add group id to user's group list
GroupSchema.post("save", function (next) {});

const Group = mongoose.model("Group", GroupSchema);
export default Group;
