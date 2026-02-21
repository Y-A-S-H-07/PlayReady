import mongoose from "mongoose"

const eventResponseSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const EventResponse = mongoose.model("EventResponse", eventResponseSchema)

export default EventResponse
