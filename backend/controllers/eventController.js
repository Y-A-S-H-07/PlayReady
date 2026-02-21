import Event from "../models/event.js"
import TeamMember from "../models/teamMember.js"
import EventResponse from "../models/eventResponse.js"


// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const {
      teamId,
      title,
      type,
      recurrenceType,
      recurringDays,
      startDate,
      endDate,
      time,
      location
    } = req.body

    const userId = req.user.id

    // Check membership
    const membership = await TeamMember.findOne({ userId, teamId })

    if (!membership) {
      return res.status(403).json({ message: "Not a team member" })
    }

    const event = await Event.create({
      teamId,
      title,
      type,
      recurrenceType: recurrenceType || "none",
      recurringDays: recurringDays || [],
      startDate,
      endDate: endDate || null,
      time,
      location: location || null, // optional
      createdBy: userId
    })

    res.status(201).json({
      message: "Event created successfully",
      event
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}



// GET TODAY EVENTS (Supports Recurrence)
export const getTodayEvents = async (req, res) => {
  try {
    const { teamId } = req.params

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dayName = today.toLocaleString("en-US", { weekday: "long" })

    const events = await Event.find({ teamId })

    const filteredEvents = events.filter(event => {
      const start = new Date(event.startDate)
      const end = event.endDate ? new Date(event.endDate) : null

      start.setHours(0,0,0,0)
      if (end) end.setHours(0,0,0,0)

      // One-time event
      if (event.recurrenceType === "none") {
        return start.getTime() === today.getTime()
      }

      // Daily recurring
      if (event.recurrenceType === "daily") {
        return today >= start && (!end || today <= end)
      }

      // Weekly recurring
      if (event.recurrenceType === "weekly") {
        return (
          today >= start &&
          (!end || today <= end) &&
          event.recurringDays.includes(dayName)
        )
      }

      return false
    })

    // Sort by time
    filteredEvents.sort((a, b) => a.time.localeCompare(b.time))

    res.status(200).json(filteredEvents)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}



// UPDATE EVENT STATUS

export const updateEventStatus = async (req, res) => {
  try {
    const { eventId, status } = req.body
    const userId = req.user.id

    let response = await EventResponse.findOne({ eventId, userId })

    if (response) {
      response.status = status
      await response.save()
    } else {
      response = await EventResponse.create({
        eventId,
        userId,
        status
      })
    }

    const populated = await EventResponse.findById(response._id)
      .populate("userId", "name collegeName")

    res.status(200).json(populated)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}



// GET EVENT RESPONSES

export const getEventResponses = async (req, res) => {
  try {
    const { eventId } = req.params

    const responses = await EventResponse.find({ eventId })
      .populate("userId", "name collegeName")

    res.status(200).json(responses)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}



// GET SINGLE EVENT

export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params

    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.status(200).json(event)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}



// GET UPCOMING EVENTS
// Sorted by Date + Time

export const getUpcomingEvents = async (req, res) => {
  try {
    const { teamId } = req.params

    const now = new Date()

    const events = await Event.find({
      teamId,
      startDate: { $gt: now }
    })

    // Sort by full datetime (date + time)
    events.sort((a, b) => {
      const dateA = new Date(a.startDate + "T" + a.time)
      const dateB = new Date(b.startDate + "T" + b.time)
      return dateA - dateB
    })

    res.status(200).json(events)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}


// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params

    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    await Event.findByIdAndDelete(eventId)

    res.status(200).json({ message: "Event deleted successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}