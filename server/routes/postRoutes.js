import express from 'express'
import { createPosts, deletePost, getAllPosts, updatePost } from '../controller/postController.js'

const router = express.Router()

router.get('/',getAllPosts)
router.post('/',createPosts)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)

export default router