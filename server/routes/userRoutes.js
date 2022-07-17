import express from 'express'
import { findAllUsers, findUser, findUserPosts, followUser, unfollowUser } from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', findAllUsers)
router.get('/:id', findUser)
router.put('/:id/follow', protect, followUser)
router.put('/:id/unfollow',  protect, unfollowUser)
router.get('/:id/posts',  findUserPosts )

export default router