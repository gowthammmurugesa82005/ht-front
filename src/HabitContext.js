import React, { createContext, useContext, useState } from 'react';

// Create the context
const HabitContext = createContext();

// Custom hook to access habit data
export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};

// HabitProvider component to wrap the application
export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [performanceData, setPerformanceData] = useState({});

  return (
    <HabitContext.Provider value={{ habits, setHabits, performanceData, setPerformanceData }}>
      {children}
    </HabitContext.Provider>
  );
};
