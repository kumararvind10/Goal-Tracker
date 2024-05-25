// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SingUP from './SingUp';
import Login from './Login';
import NotFound from './NotFound'
import SetGoal from './SetGoal';
import SetTask from './SetTask';
import GoalsAndTasks from './GoalsAndTasks';
import { UserProvider } from './context/UserContext';

const AppRoutes = () => {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<SingUP />} />
                <Route path="/SingUP" element={<SingUP />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/setGoal" element={<SetGoal />} />
                <Route path="/setTask" element={<SetTask />} />
                <Route path="/goals-tasks" element={<GoalsAndTasks />} />


                <Route path="*" element={<NotFound />} />

            </Routes>
        </UserProvider>
    );
};

export default AppRoutes;
