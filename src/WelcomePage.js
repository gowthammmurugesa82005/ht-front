import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };


  return (
    <div className="welcome-page">
      <header className="header">
        <h1>Habit Tracker</h1>
      </header>
      <main className="main-content">
        <h2>
          “We first make our habits, <br /> then our habits make us.”
        </h2>
        <p>— John Dryden</p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </main>
    </div>
  );
};

export default WelcomePage;
