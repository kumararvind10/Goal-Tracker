const express = require('express')

const router = express.Router()

const Goal = require('../Model/Goal')


router.post('/setGoal', async (req, res) => {
    try {
        const { user, title, description, minTimeLine, maxTimeLine, userTimeLine } = req.body
        
        const newGoal = new Goal({ user, title, description, minTimeLine, maxTimeLine, userTimeLine })
        await newGoal.save()
        res.status(200).json({ errorCode: 0, status: 'Goal set Successfully', response: newGoal })
    } catch (err) {
        console.log(err)
        res.status(500).json({ errorCode: 1, status: 'Something went wrong', error: err })
    }
})


module.exports = router