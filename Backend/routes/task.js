const express = require('express')

const router = express.Router()

const Task = require('../Model/Task')

router.post('/setTask', async (req, res) => {
    try {

        const { user, goal, title, quantity, frequency, daysOfWeek, autoReminder } = req.body

        if (!frequency) {
            res.status(200).json({ errorCode: 1, status: 'Frequency is required' })

        }
        const newTask = new Task({ goal, title, quantity, frequency, daysOfWeek, autoReminder })
        await newTask.save()
        res.status(200).json({ errorCode: 0, status: 'newTask created Successfully', response: newTask })
    } catch (err) {
        console.log(err)
        res.status(500).json({ errorCode: 1, status: 'Something went wrong', error: err })
    }
})

module.exports = router