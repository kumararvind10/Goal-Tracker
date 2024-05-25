import React, { useState, useContext, useEffect } from 'react';
import '../style/SetTask.css'; // Import CSS file for styling
import GoalApi from '../redux/Api'
import { UserContext } from '../components/context/UserContext';
import { useNavigate } from 'react-router-dom';

const goalApi = new GoalApi()


const SetTask = () => {
    const [taskData, setTaskData] = useState({ title: '', quantity: '', frequency: '', daysOfWeek: [], reminders: [], autoReminder: false });
    const { userId, setUserId, goalId } = useContext(UserContext); // Get userId from context
    const [errorText, setErrorText] = useState('')
    const [errorPop, setErrorPop] = useState(false)
    const nevigate = useNavigate()

    useEffect(() => {
        handleUserLoggedInCheck()
    }, [])
    const handleUserLoggedInCheck = () => {
        if (!userId) {
            let session_id = sessionStorage.getItem('session_userId');
            setUserId(session_id)
      
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTaskData({
            ...taskData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleDaysChange = (e) => {
        const { value, checked } = e.target;
        setTaskData({
            ...taskData,
            daysOfWeek: checked
                ? [...taskData.daysOfWeek, value]
                : taskData.daysOfWeek.filter((day) => day !== value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await goalApi.setTask({ ...taskData, goal: goalId, user: userId });
            if (response && response.errorCode == 0) {
                await goalApi.setLogs({ userId: goalId, action: 'Set Task' })
                nevigate('/goals-tasks')

            }else{
                setErrorText(response.status)
                setErrorPop(true)
                return
            }
        } catch (error) {
            console.error('Error setting task:', error);
        }
    };

    return (
        <div className="task-form-container">
            <h2 className="task-form-title">Set Task</h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" placeholder="Task Title" onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <select name="frequency" onChange={handleChange} className="form-control">
                        <option value="once a day">Once a day</option>
                        <option value="twice a day">Twice a day</option>
                        <option value="no of days">No of days</option>
                        <option value="days of week">Days of week</option>
                        <option value="once a week">Once a week</option>
                    </select>
                </div>
                {errorPop && <p>{errorText}</p>}
                <div className="form-group">
                    <label>Days of the week:</label>
                    <div className="checkbox-group">
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                            <label key={day} className="checkbox-label">
                                <input type="checkbox" value={day} onChange={handleDaysChange} />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label className="checkbox-label">
                        <input type="checkbox" name="autoReminder" onChange={handleChange} />
                        Auto Reminder
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Set Task</button>
            </form>
        </div>
    );
};

export default SetTask;
