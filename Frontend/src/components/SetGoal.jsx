import React, { useState, useContext, useEffect } from 'react';
import '../style/SetGoal.css';
import GoalApi from '../redux/Api'
import { UserContext } from '../components/context/UserContext';
import { useNavigate } from 'react-router-dom';


const goalApi = new GoalApi()


const SetGoal = () => {
  const [goalData, setGoalData] = useState({ title: '', description: '', minTimeLine: '', maxTimeLine: '', userTimeLine: '' });

  const { userId, setUserId, setGoalId } = useContext(UserContext); // Get userId from context
  const nevigate = useNavigate()

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
  const handleChange = (e) => {
    setGoalData({ ...goalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await goalApi.setGoal({ ...goalData, user: userId });
      if (response && response.errorCode == 0) {
        let goalId = (response && response.response && response.response._id) ? response.response._id : ''
        setGoalId(goalId)
        await goalApi.setLogs({ userId: userId, action: 'Set Goal' })
        nevigate('/setTask')
      }

    } catch (error) {
      console.error('Error setting goal:', error);
    }
  };

  return (
    <div className="goal-form-container">
      <h2 className="goal-form-title">Set Goal</h2>
      <form className="goal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="title" placeholder="Goal Title" onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <input type="text" name="description" placeholder="Goal Description" onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <input type="text" name="minTimeLine" placeholder="Min Timeline" onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <input type="text" name="maxTimeLine" placeholder="Max Timeline" onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <input type="text" name="userTimeLine" placeholder="Your Timeline" onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Set Goal</button>
      </form>
    </div>
  );
};

export default SetGoal;
