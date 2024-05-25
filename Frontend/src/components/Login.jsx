import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/context/UserContext';


import GoalApi from '../redux/Api'
import SuccessPopup from './SuccessPopup'

const goalApi = new GoalApi()



function Login() {
    const nevigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [successToggle, setSuccessToggle] = useState(false)

    const [popupMsg, setpopupMes] = useState('')
    const [closePopMsg, setClosePopMsg] = useState('SingUp')
    const [redirectFlag, setRedirectFlag] = useState(true)
    const { setUserId } = useContext(UserContext);




    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let res = await goalApi.login(formData)
            if (res && res.errorCode == 0) {
                let userid = (res && res.response.userId) ? res.response.userId : ''
                sessionStorage.setItem('session_userId', userid); 
                setUserId(userid)
                nevigate('/setGoal')
                return false;
            } else if (res && res.errorCode == 2) {
                setSuccessToggle(true)
                setpopupMes(res.status)
            } else {
                setSuccessToggle(true)
                setRedirectFlag(false)
                setClosePopMsg('Login')
                setpopupMes(res.status)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleSignup = () => {

        nevigate('/SingUP');
        return
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })


    }

    const handlePopup = () => {
        setSuccessToggle(false)
        if (redirectFlag) {
            nevigate('/SingUP');
        }
        return
    }


    if (successToggle) {
        return <SuccessPopup message={popupMsg} handlePopup={handlePopup} closePopMsg={closePopMsg} />
    }


    return (
        <div className="container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

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
                <button type="submit">Login</button>
                <br />
                <button type="submit" onClick={handleSignup}>Sign up</button>

            </form>
        </div>
    )

}

export default Login