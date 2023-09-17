import express from 'express'
import {
  getRssItems,
  createRssItem,
  getRssItemById,
  deleteRssItem,
  updateRssItem
} from './rssController'

const router = express.Router()

router.get('/', getRssItems)
router.post('/', createRssItem)
router.get('/:id', getRssItemById)
router.patch('/:id', updateRssItem)
router.delete('/:id', deleteRssItem)

export default router
