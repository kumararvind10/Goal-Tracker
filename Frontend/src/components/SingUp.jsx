
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../style/Signup.css'
import GoalApi from '../redux/Api'
import SuccessPopup from './SuccessPopup'

const goalApi = new GoalApi()
function SingUP() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [successToggle, setSuccessToggle] = useState(false)
    const [popupMsg, setpopupMes] = useState('')


    const handleChange = (e) => {
        let { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handlePopup = () => {
        navigate('/Login')
        return
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res = await goalApi.signup(formData)
            if (res && res.errorCode == 0) {
                setSuccessToggle(true)
                setpopupMes(res.status)
            } else {
                setSuccessToggle(true)
                setpopupMes('Something Went wrong. Please try again')
            }
        } catch (error) {
            console.log(error)
        }

    }

    if (successToggle) {
        return <SuccessPopup message={popupMsg} handlePopup={handlePopup} closePopMsg={'Login'} />
    }

    return (

        <div className="container">

            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign up</button>
                <br></br>
                <button type="submit" onClick={handlePopup}>Login</button>

            </form>
        </div>

    );
};





export default SingUP