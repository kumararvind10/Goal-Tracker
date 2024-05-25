const express = require('express')

const router = express.Router()

const userRoutes = require('./user')
const goalRoutes = require('./goal')
const taskRoutes = require('./task')
const logRoutes = require('./log')




router.use('/user', userRoutes)
router.use('/goal', goalRoutes)
router.use('/task', taskRoutes)
router.use('/log', logRoutes)

module.exports = router