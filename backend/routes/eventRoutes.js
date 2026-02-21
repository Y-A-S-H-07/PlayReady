import { getUpcomingEvents } from "../controllers/eventController.js"
import { deleteEvent } from "../controllers/eventController.js"
import express from "express"
import {
  createEvent,
  getTodayEvents,
  updateEventStatus,
  getEventResponses,
  getEventById
} from "../controllers/eventController.js"

import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create", protect, createEvent)
router.get("/today/:teamId", protect, getTodayEvents)
router.get("/upcoming/:teamId", protect, getUpcomingEvents)


router.get("/:eventId/responses", protect, getEventResponses)

router.get("/:eventId", protect, getEventById)
router.delete("/:eventId", protect, deleteEvent)

router.post("/status", protect, updateEventStatus)

export default router
