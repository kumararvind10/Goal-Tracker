const express = require('express')

const router = express.Router()

const User = require('../Model/User')
const Goal = require('../Model/Goal')
const Task = require('../Model/Task')


//user signup
router.post('/signUp', async (req, res) => {

    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(400).json({ errorCode: 1, status: 'kindly pass the required params' })

        }
        let response = await User.find({ email: email })
        if (response && response.length > 0) {
            res.status(200).json({ errorCode: 0, status: 'User Already registered', response: email })

        }

        const newUser = new User({ username: username, email: email, password: password })
        await newUser.save()
        res.status(200).json({ errorCode: 0, status: 'User signup Successfully', response: email })
    } catch (err) {
        console.log(err)
        res.status(500).json({ errorCode: 1, status: 'Something went wrong', error: err })
    }

})


router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({ errorCode: 1, status: 'kindly pass the required params' })

        }
        let response = await User.find({ email: email })
        if (response && response.length > 0) {
            let validPass = (response && response[0].password) ? response[0].password : ''
            let validEmail = (response && response[0].email) ? response[0].email : ''
            if (validPass === password && validEmail === email) {
                let result = {}
                let username = (response && response[0].username) ? response[0].username : ''
                let userId = (response && response[0]._id) ? response[0]._id : ''
                result['userId'] = userId
                result['username'] = username
                res.status(200).json({ errorCode: 0, status: 'User login Successfully', response: result })

            } else {
                res.status(200).json({ errorCode: 1, status: 'User email or password is invalid', response: email })

            }

        } else {
            res.status(200).json({ errorCode: 2, status: 'User Not registered', response: email })

        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ errorCode: 1, status: 'Something went wrong', error: err })
    }

})




router.post('/getGoalAndTask', async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId) {
            res.status(400).json({ errorCode: 1, status: 'kindly pass the userId' })

        }
        let result = []
        let obj = {}

        let goalResponse = await Goal.find({ user: userId })
        if (goalResponse && goalResponse.length > 0) {

            res.status(200).json({ errorCode: 0, status: 'Goal found', response: goalResponse })



        } else {
            res.status(200).json({ errorCode: 1, status: 'User Not registered', response: result })

        }

    } catch (error) {
        console.log(err)
        res.status(500).json({ errorCode: 1, status: 'Something went wrong', error: err })

    }
})


module.exports = router