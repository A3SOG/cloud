import express from 'express'
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog
} from '../controllers/blogController'

const router = express.Router()

router.post('/', createBlog)
router.get('/', getAllBlogs)
router.get('/:id', getBlogById)
router.patch('/:id', updateBlog)
router.delete('/:id', deleteBlog)

export default router
