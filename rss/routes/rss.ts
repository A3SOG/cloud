import express from 'express'
import {
  createRSS,
  deleteRSS,
  getAllRSS,
  getRSSById,
  updateRSS
} from '../controllers/rssController'

const router = express.Router()

router.post('/', createRSS)
router.get('/', getAllRSS)
router.get('/:id', getRSSById)
router.patch('/:id', updateRSS)
router.delete('/:id', deleteRSS)

export default router
