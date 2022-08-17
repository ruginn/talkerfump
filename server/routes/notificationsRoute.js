import express from 'express'
import { getNotifications, setReadNotifications} from '../controllers/notificationsController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getNotifications)
router.put(`/:id/read`, setReadNotifications)

export default router