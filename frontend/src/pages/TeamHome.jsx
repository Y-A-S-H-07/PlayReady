import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"

function TeamHome() {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const [todayEvents, setTodayEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [membersCount, setMembersCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todayRes = await api.get(`/events/today/${teamId}`)
        const upcomingRes = await api.get(`/events/upcoming/${teamId}`)
        const membersRes = await api.get(`/teams/${teamId}/members`)

        setTodayEvents(todayRes.data)
        setUpcomingEvents(upcomingRes.data)
        setMembersCount(membersRes.data.length)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [teamId])

  const EventCard = ({ event }) => (
    <div
      onClick={() => navigate(`/event/${event._id}`)}
      className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl hover:bg-gray-700 transition duration-200 cursor-pointer"
    >
      {/* ROW 1 */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {event.title}
        </h3>

        <p className="text-sm text-gray-400">
          {new Date(event.startDate).toDateString()} | {event.time}
        </p>
      </div>

      {/* ROW 2 */}
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm capitalize text-gray-400">
          {event.type}
        </p>

        {event.location && (
          <p className="text-sm text-gray-400">
            {event.location}
          </p>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-6 sm:p-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
        <h1 className="text-3xl font-bold tracking-wide">Team Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/team/${teamId}/members`)}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl shadow-md transition duration-200"
          >
            View Members
          </button>

          <button
            onClick={() => navigate(`/create-event/${teamId}`)}
            className="bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-xl shadow-md transition duration-200"
          >
            + Create Event
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Members</h3>
          <p className="text-3xl font-bold mt-2">{membersCount}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Today's Events</h3>
          <p className="text-3xl font-bold mt-2">{todayEvents.length}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Upcoming</h3>
          <p className="text-3xl font-bold mt-2">{upcomingEvents.length}</p>
        </div>
      </div>

      {/* TODAY EVENTS */}
      <h2 className="text-2xl font-bold mb-6 tracking-wide">Today's Events</h2>

      {todayEvents.length === 0 ? (
        <p className="text-gray-400 mb-12">No events today.</p>
      ) : (
        <div className="space-y-5 mb-12">
          {todayEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {/* UPCOMING EVENTS */}
      <h2 className="text-2xl font-bold mb-6 tracking-wide">Upcoming Events</h2>

      {upcomingEvents.length === 0 ? (
        <p className="text-gray-400">No upcoming events.</p>
      ) : (
        <div className="space-y-5">
          {upcomingEvents.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TeamHome