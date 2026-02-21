import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function Dashboard() {
  const navigate = useNavigate()

  const [teams, setTeams] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)

  const [teamName, setTeamName] = useState("")
  const [sportType, setSportType] = useState("")
  const [joinCode, setJoinCode] = useState("")
  const [joinInput, setJoinInput] = useState("")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const fetchTeams = async () => {
    try {
      const res = await api.get("/teams/my-teams")
      setTeams(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const handleCreateTeam = async (e) => {
    e.preventDefault()
    try {
      await api.post("/teams/create", {
        name: teamName,
        sportType,
        joinCode
      })
      setTeamName("")
      setSportType("")
      setJoinCode("")
      setShowCreate(false)
      fetchTeams()
    } catch (err) {
      alert(err.response?.data?.message || "Error creating team")
    }
  }

  const handleJoinTeam = async (e) => {
    e.preventDefault()
    try {
      await api.post("/teams/join", {
        joinCode: joinInput
      })
      setJoinInput("")
      setShowJoin(false)
      fetchTeams()
    } catch (err) {
      alert(err.response?.data?.message || "Error joining team")
    }
  }

  return (
    <div className="min-h-screen p-6 sm:p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My Teams</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* ACTION BUTTONS */}
      {/* ACTION BUTTONS */}
      <div className="flex justify-center items-center gap-6 mb-12">
          <button
              onClick={() => {
                setShowCreate(!showCreate)
                setShowJoin(false)
              }}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl text-lg transition"
            >
              Create Team
            </button>

            <button
              onClick={() => {
                setShowJoin(!showJoin)
                setShowCreate(false)
              }}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-lg transition"
            >
              Join Team
          </button>
      </div>

      {/* CREATE FORM */}
      {showCreate && (
        <div className="bg-gray-800 p-6 rounded-2xl mb-8">
          <form onSubmit={handleCreateTeam} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="p-2 rounded bg-gray-700"
            />

            <input
              type="text"
              placeholder="Sport Type"
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              required
              className="p-2 rounded bg-gray-700"
            />

            <input
              type="text"
              placeholder="Join Code (e.g. KAB123)"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              required
              className="p-2 rounded bg-gray-700"
            />

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 rounded-lg"
            >
              Create
            </button>
          </form>
        </div>
      )}

      {/* JOIN FORM */}
      {showJoin && (
        <div className="bg-gray-800 p-6 rounded-2xl mb-8">
          <form onSubmit={handleJoinTeam} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter Join Code"
              value={joinInput}
              onChange={(e) => setJoinInput(e.target.value)}
              required
              className="p-2 rounded bg-gray-700"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Join
            </button>
          </form>
        </div>
      )}

      {/* TEAM LIST */}
      {teams.length === 0 ? (
        <p className="text-gray-400">No teams joined yet.</p>
      ) : (
        <div className="space-y-4">
          {teams.map((member) => (
            <div
              key={member._id}
              onClick={() => navigate(`/team/${member.teamId._id}`)}
              className="bg-gray-800 p-5 rounded-2xl cursor-pointer hover:bg-gray-700 transition"
            >

              {/* ROW 1 */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {member.teamId.name}
                </h2>

                <p className="text-gray-400 text-sm">
                  Sport: {member.teamId.sportType}
                </p>
              </div>

              {/* ROW 2 */}
              <div className="flex justify-between items-center mt-3">
                <p className="capitalize text-sm">
                  {member.role}
                </p>

                <p className="text-sm text-gray-400">
                  Join Code: {member.teamId.joinCode}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Dashboard