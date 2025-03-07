import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabits } from './HabitContext'; // Correctly import useHabits
import './HabitCreationPage.css';

const HabitCreationPage = () => {
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState([]);
  const { habits, setHabits } = useHabits(); // Access the context
  const navigate = useNavigate();

  const handleFrequencyChange = (day) => {
    setFrequency((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleCreateHabit = () => {
    if (habits.includes(habitName)) {
      alert(`The habit "${habitName}" already exists!`);
    } else {
      setHabits([...habits, habitName]); // Add the new habit
      alert(`Habit "${habitName}" created successfully!`);
      navigate('/habit-tracker');
    }
  };

  return (
    <div className="habit-creation-page">
      <h2>Create new habit</h2>
      <form>
        <div className="form-group">
          <label>Habit name</label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="Enter habit name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter habit description"
          />
        </div>
        <div className="form-group">
          <label>Frequency</label>
          <div className="frequency">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={frequency.includes(day)}
                  onChange={() => handleFrequencyChange(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        <button type="button" className="create-habit-btn" onClick={handleCreateHabit}>
          CREATE HABIT
        </button>
      </form>
    </div>
  );
};

export default HabitCreationPage;
