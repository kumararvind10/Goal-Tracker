// src/context/UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Initialize userId state
  const [goalId, setGoalId] = useState(null)

  return (
      <UserContext.Provider value={{ userId, setUserId, goalId, setGoalId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
