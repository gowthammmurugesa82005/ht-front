import React, { useState } from 'react';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Placeholder for sending a password reset email
    console.log('Password reset email sent to:', email);
    setMessage('A password reset link has been sent to your email.');
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      {message && <div className="success-message">{message}</div>}
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="reset-button">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;

