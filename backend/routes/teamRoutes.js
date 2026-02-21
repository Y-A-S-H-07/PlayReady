import express from "express"
import { createTeam, joinTeam, getMyTeams } from "../controllers/teamController.js"
import { protect } from "../middleware/authMiddleware.js"
import { getTeamMembers } from "../controllers/teamController.js"

const router = express.Router()

router.post("/create", protect, createTeam)
router.post("/join", protect, joinTeam)
router.get("/my-teams", protect, getMyTeams)
router.get("/:teamId/members", protect, getTeamMembers)

export default router
