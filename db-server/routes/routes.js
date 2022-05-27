import express from 'express'
import User from '../model/user.js'

const router = express.Router()

//Post Method
router.post('/create-user', async (req, res) => {
  const user = await User.findOne({ address: req.body.address })
  if (!user) {
    const data = new User({
      address: req.body.address,
      models: req.body.models,
    })
    try {
      const dataToSave = data.save()
      res.status(200).json(dataToSave)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
})

//Get by ID Method
router.get('/get-user/:address', async (req, res) => {
  const user = await User.findOne({ address: req.params.address })
  if (user) return res.status(200).json(user)
  if (!user) return res.status(500).send({ message: 'Error' })
})

//Update by ID Method
router.patch('/update-user/', async (req, res) => {
  await User.findOneAndUpdate({ address: req.body.address }, { models: req.body.models }, { new: true })
  return res.status(200).send({ message: 'OK' })
})

export default router
