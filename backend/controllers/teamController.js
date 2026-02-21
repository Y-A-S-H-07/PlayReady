import Team from "../models/team.js"
import TeamMember from "../models/teamMember.js"

// Create Team
export const createTeam = async (req, res) => {
  try {
    const { name, sportType, joinCode } = req.body
    const userId = req.user.id

    // Check if joinCode already exists
    const existingCode = await Team.findOne({ joinCode })
    if (existingCode) {
      return res.status(400).json({ message: "Join code already exists" })
    }

    const team = await Team.create({
      name,
      sportType,
      joinCode: joinCode.toUpperCase(),
      createdBy: userId
    })

    await TeamMember.create({
      userId,
      teamId: team._id,
      role: "captain"
    })

    res.status(201).json({
      message: "Team created successfully",
      team
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}



// Join Existing Team
export const joinTeam = async (req, res) => {
  try {
    const { joinCode } = req.body
    const userId = req.user.id

    const team = await Team.findOne({
      joinCode: joinCode.toUpperCase()
    })

    if (!team) {
      return res.status(404).json({ message: "Invalid join code" })
    }

    const existingMember = await TeamMember.findOne({
      userId,
      teamId: team._id
    })

    if (existingMember) {
      return res.status(400).json({ message: "Already joined this team" })
    }

    await TeamMember.create({
      userId,
      teamId: team._id,
      role: "player"
    })

    res.status(200).json({ message: "Joined team successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}


// Get My Teams
export const getMyTeams = async (req, res) => {
  try {
    const userId = req.user.id

    const memberships = await TeamMember.find({ userId })
      .populate("teamId")

    res.status(200).json(memberships)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}



export const getTeamMembers = async (req, res) => {
  try {
    const { teamId } = req.params

    const members = await TeamMember.find({ teamId })
      .populate("userId", "name collegeName email")

    res.status(200).json(members)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

