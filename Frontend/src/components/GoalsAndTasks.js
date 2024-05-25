// src/components/GoalsAndTasks.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../components/context/UserContext';
import '../style/GoalsAndTasks.css';


import GoalApi from '../redux/Api'

const goalApi = new GoalApi()



const GoalsAndTasks = () => {
    const { userId, setUserId } = useContext(UserContext); // Get userId from context
    const [goals, setGoals] = useState([]);
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        handleUserLoggedInCheck()
    }, [])
    const handleUserLoggedInCheck = () => {
        if (!userId) {
            let session_id = sessionStorage.getItem('session_userId');
            setUserId(session_id)
            // nevigate('/Login')
        }
    }

    useEffect(() => {
        const fetchGoalsAndTasks = async () => {
            try {
                const goalsResponse = await goalApi.getGoalAndTask({ userId });
                if (goalsResponse && goalsResponse.errorCode == 0) {
                    setGoals(goalsResponse.response);

                }

                // const tasksResponse = await axios.get(`/api/tasks?user=${userId}`);
                // setTasks(tasksResponse.data);
            } catch (error) {
                console.error('Error fetching goals and tasks:', error);
            }
        };

        if (userId) {
            fetchGoalsAndTasks();
        }
    }, [userId]);

    return (
        <div className="goals-tasks-container">
            {goals.map((goal) => (
                <div key={goal._id} className="goal-card">
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                    <p> {goal.userTimeLine}</p>
                </div>
            ))}
        </div>
    );
};

export default GoalsAndTasks;
