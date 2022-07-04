import express from 'express'
import { createPost, getPost, deletePost, updatePost, likePost, commentPost } from '../controllers/postController.js'

const router = express.Router()

router.post('/', createPost)
router.get('/:id', getPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)
router.put('/:id/like', likePost)
router.put('/:id/comment', commentPost)

export default router

