import axios from 'axios'

class GoalApi {

    async signup(params) {
        try {
            let res = await axios.post('http://localhost:5000/api/user/signup', params)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    async login(params) {
        try {
            let res = await axios.post('http://localhost:5000/api/user/login', params)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    async setGoal(params) {
        try {
            let res = await axios.post('http://localhost:5000/api/goal/setGoal', params)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }


    async setTask(params) {
        try {
            let res = await axios.post('http://localhost:5000/api/task/setTask', params)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    async setLogs(params) {
        try {
            let res = await axios.post('http://localhost:5000/api/log/setLogs', params)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    
    async getGoalAndTask(params) {
        try {
            let res = await axios.post('http://localhost:5000/api/user/getGoalAndTask', params)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    


}


export default GoalApi