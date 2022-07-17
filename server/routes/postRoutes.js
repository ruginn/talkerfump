import express from 'express'
import { createPost, getPost, deletePost, updatePost, likePost, commentPost, getTimelinePosts, myPosts, getTimelinePosts2, deleteComment, likeComment} from '../controllers/postController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createPost)
router.get('/myposts', protect, myPosts)
router.get('/timeline', protect, getTimelinePosts)
router.get('/:id', getPost)
router.delete('/:id', protect, deletePost)
router.put('/:id', updatePost)
router.put('/:id/like', protect, likePost)
router.put('/:id/comment',protect, commentPost)
router.put('/:id/comment/like', protect, likeComment)
router.put('/:id/comment/delete', protect,  deleteComment)
router.get('/:id/timeline', protect, getTimelinePosts)


export default router

