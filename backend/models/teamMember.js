import mongoose from "mongoose"

const teamMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },
    role: {
      type: String,
      enum: ["captain", "player"],
      default: "player"
    }
  },
  { timestamps: true }
)

const TeamMember = mongoose.model("TeamMember", teamMemberSchema)

export default TeamMember
