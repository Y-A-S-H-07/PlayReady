import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../api/axios"

function CreateEvent() {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [type, setType] = useState("practice")
  const [recurrenceType, setRecurrenceType] = useState("none")
  const [recurringDays, setRecurringDays] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]

  const toggleDay = (day) => {
    if (recurringDays.includes(day)) {
      setRecurringDays(recurringDays.filter(d => d !== day))
    } else {
      setRecurringDays([...recurringDays, day])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/events/create", {
        teamId,
        title,
        type,
        recurrenceType,
        recurringDays: recurrenceType === "weekly" ? recurringDays : [],
        startDate,
        endDate: recurrenceType !== "none" ? endDate : null,
        time,
        location
      })

      alert("Event Created Successfully")
      navigate(`/team/${teamId}`)

    } catch (err) {
      console.error(err)
      alert("Error creating event")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Create Event
        </h2>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700"
        />

        {/* TYPE */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="practice">Practice</option>
          <option value="match">Match</option>
          <option value="tournament">Tournament</option>
        </select>

        {/* RECURRENCE */}
        <select
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="none">One Time</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>

        {/* START DATE */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700"
        />

        {/* END DATE (Only for daily/weekly) */}
        {recurrenceType !== "none" && (
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700"
          />
        )}

        {/* WEEKLY DAY SELECTOR */}
        {recurrenceType === "weekly" && (
          <div className="grid grid-cols-3 gap-2 text-sm">
            {daysOfWeek.map(day => (
              <label key={day} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={recurringDays.includes(day)}
                  onChange={() => toggleDay(day)}
                />
                {day.slice(0,3)}
              </label>
            ))}
          </div>
        )}

        {/* TIME */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700"
        />

        {/* LOCATION (Optional) */}
        <input
          type="text"
          placeholder="Ground / Location (Optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateEvent