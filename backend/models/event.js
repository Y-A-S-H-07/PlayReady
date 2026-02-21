import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["practice", "match", "tournament"],   // only these two
      required: true
    },

    recurrenceType: {
      type: String,
      enum: ["none", "daily", "weekly"],
      default: "none"
    },

    recurringDays: {
      type: [String], // Example: ["Monday", "Wednesday"]
      default: []
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      default: null
    },

    time: {
      type: String,
      required: true
    },

    location: {
      type: String,
      default: null   // optional
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
)

const Event = mongoose.model("Event", eventSchema)

export default Event