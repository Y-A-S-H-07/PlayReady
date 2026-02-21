import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"

function EventDetail() {
  const { eventId } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [responses, setResponses] = useState([])

  const currentUserId = localStorage.getItem("userId")

  const arrivedCount = responses.filter(r => r.status === "arrived").length
  const onTheWayCount = responses.filter(r => r.status === "on_the_way").length
  const gettingReadyCount = responses.filter(r => r.status === "getting_ready").length
  const notComingCount = responses.filter(r => r.status === "not_coming").length

  const totalJoining = arrivedCount + onTheWayCount + gettingReadyCount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await api.get(`/events/${eventId}`)
        const responsesRes = await api.get(`/events/${eventId}/responses`)

        setEvent(eventRes.data)
        setResponses(responsesRes.data || [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [eventId])

  const handleStatusUpdate = async (status) => {
    try {
      await api.post("/events/status", { eventId, status })
      const res = await api.get(`/events/${eventId}/responses`)
      setResponses(res.data || [])
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?")
    if (!confirmDelete) return

    try {
      await api.delete(`/events/${eventId}`)
      navigate(-1)
    } catch (error) {
      console.error(error)
    }
  }

  if (!event) {
    return <div className="p-10">Loading...</div>
  }

  return (
    <div className="min-h-screen p-6 sm:p-10">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-gray-400 mt-2">
            {new Date(event.startDate).toDateString()} | {event.time}
          </p>
          {event.location && (
            <p className="text-gray-400">
              Location: {event.location}
            </p>
          )}
        </div>

        <button
          onClick={handleDeleteEvent}
          className="border border-red-500 text-red-500 px-4 py-2 rounded-lg 
                     hover:bg-red-600 hover:text-white transition duration-200 text-sm"
        >
          Delete Event
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Update Status</h2>

      <h2 className="text-xl font-semibold mb-4">Update Status</h2>

        {/* PRACTICE + MATCH STATUS */}
        {(event.type === "practice" || event.type === "match") && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">

            <button
              onClick={() => handleStatusUpdate("on_the_way")}
              className="bg-yellow-500 hover:bg-yellow-600 py-2 rounded-xl"
            >
              On The Way
            </button>

            <button
              onClick={() => handleStatusUpdate("getting_ready")}
              className="bg-blue-500 hover:bg-blue-600 py-2 rounded-xl"
            >
              Getting Ready
            </button>

            <button
              onClick={() => handleStatusUpdate("arrived")}
              className="bg-green-600 hover:bg-green-700 py-2 rounded-xl"
            >
              Arrived
            </button>

            <button
              onClick={() => handleStatusUpdate("not_coming")}
              className="bg-red-500 hover:bg-red-600 py-2 rounded-xl"
            >
              Not Coming
            </button>

          </div>
        )}

        {/* TOURNAMENT STATUS */}
        {event.type === "tournament" && (
          <div className="grid grid-cols-2 gap-3 mb-10">

            <button
              onClick={() => handleStatusUpdate("interested")}
              className="bg-green-600 hover:bg-green-700 py-2 rounded-xl"
            >
              Interested
            </button>

            <button
              onClick={() => handleStatusUpdate("not_interested")}
              className="bg-red-500 hover:bg-red-600 py-2 rounded-xl"
            >
              Not Interested
            </button>

          </div>
        )}
      {/* SUMMARY */}
      <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <SummaryBox label="Arrived" value={arrivedCount} />
        <SummaryBox label="On The Way" value={onTheWayCount} />
        <SummaryBox label="Getting Ready" value={gettingReadyCount} />
        <SummaryBox label="Not Coming" value={notComingCount} />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold">
          Total Joining: {totalJoining}
        </h3>
      </div>

      {/* PLAYERS */}
      <h2 className="text-xl font-semibold mb-4">Players</h2>

      {responses.length === 0 ? (
        <p className="text-gray-400">No responses yet.</p>
      ) : (
        <div className="space-y-4">
          {responses.map(res => (
            <div
              key={res._id}
              className="bg-gray-800 p-4 rounded-xl flex justify-between items-center"
            >
                <span>
                    {res?.userId
                        ? (res.userId._id.toString() === currentUserId
                            ? "You"
                            : res.userId.name)
                        : "Loading..."}
                </span>

              <span className="capitalize">
                {res.status?.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const SummaryBox = ({ label, value }) => (
  <div className="bg-gray-800 p-4 rounded-xl text-center">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
)

export default EventDetail