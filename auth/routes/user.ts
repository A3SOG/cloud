import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getCharacterByUserId,
  getUserById,
  updateUser
} from '../controllers/userController'

const router = express.Router()

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/:id/character', getCharacterByUserId)
router.get('/:id', getUserById)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
