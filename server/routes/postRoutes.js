import express from 'express'
import { createPosts, deletePost, getAllPosts, getPost, updatePost } from '../controller/postController.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/',getAllPosts)
router.get('/:id',getPost)
router.post('/',verifyToken,createPosts)
router.put('/:id',verifyToken,updatePost)
router.delete('/:id',verifyToken,deletePost)

export default router