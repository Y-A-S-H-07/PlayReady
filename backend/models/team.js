import mongoose from "mongoose"

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sportType: {
    type: String,
    required: true
  },
  joinCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true })

export default mongoose.model("Team", teamSchema)