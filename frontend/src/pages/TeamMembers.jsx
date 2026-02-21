import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api/axios"

function TeamMembers() {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get(`/teams/${teamId}/members`)
        setMembers(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchMembers()
  }, [teamId])

  return (
    <div className="min-h-screen p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Team Members</h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

      {members.length === 0 ? (
        <p className="text-gray-400">No members found.</p>
      ) : (
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member._id}
              className="bg-gray-800 p-4 rounded flex justify-between"
            >
              <div>
                <h2 className="font-semibold">
                  {member.userId.name}
                </h2>
                <p className="text-sm text-gray-400">
                  {member.userId.collegeName || "No College"}
                </p>
              </div>

              <span className="capitalize bg-gray-700 px-3 py-1 rounded text-sm">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TeamMembers