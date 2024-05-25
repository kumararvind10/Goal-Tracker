const express = require('express')

const router = express.Router()

const Log = require('../Model/Log')


router.post('/setLogs', async (req, res) => {
    try {
        const { userId, action } = req.body
      
        const newLogs = new Log({ userId, action })
        await newLogs.save()
        res.status(200).json({ errorCode: 0, status: 'User signup Successfully', response: newLogs })
    } catch (err) {
        console.log(err)
        res.status(500).json({ errorCode: 1, status: 'Something went wrong', error: err })
    }
})


module.exports = router