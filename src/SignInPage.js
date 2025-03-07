import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInPage.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    // Example: Validate credentials (this is just a placeholder for real API logic)
    if (email === 'test@example.com' && password === 'password123') {
      console.log('Sign In Successful:', { email });
      navigate('/profile'); // Navigate to the profile page on success
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to the Forgot Password page
  };

  return (
    <div className="signin-page">
      <h2>Sign In</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signin-button">Sign In</button>
      </form>
      <button className="forgot-password-link" onClick={handleForgotPassword}>
        Forgot Password?
      </button>
    </div>
  );
};

export default SignInPage;
