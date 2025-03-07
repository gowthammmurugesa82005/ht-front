import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google'; // Google OAuth library
import GitHubLogin from 'react-github-login'; // GitHub OAuth library
import FacebookLogin from 'react-facebook-login'; // Facebook OAuth library
import { useMsal } from '@azure/msal-react'; // For Microsoft login
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // JWT decoding for Google login
import './SignUpPage.css';

const SignUpPage = ({ googleClientId, githubClientId, facebookClientId }) => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('SignUpPage rendered');
  }, []);

  // Handle Google Signup
  const handleGoogleSignup = (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      navigate('/profile');
    } catch (error) {
      console.error('Google Signup Failed:', error);
      setError('Google Signup failed, please try again.');
    }
  };

  // Handle GitHub Signup
  const handleGitHubSignup = (response) => {
    console.log('GitHub Signup Success:', response);
    navigate('/profile');
  };

  // Handle Facebook Signup
  const handleFacebookSignup = (response) => {
    if (response.status !== 'unknown') {
      console.log('Facebook Signup Success:', response);
      navigate('/profile');
    } else {
      console.error('Facebook Signup Failed:', response);
      setError('Facebook Signup failed, please try again.');
    }
  };

  // Handle Microsoft Signup
  const handleMicrosoftSignup = async () => {
    try {
      const loginResponse = await instance.loginPopup({ scopes: ['User.Read'] });
      console.log('Microsoft Signup Success:', loginResponse.account);
      navigate('/profile');
    } catch (error) {
      console.error('Microsoft Signup Failed:', error);
      setError('Microsoft Signup failed, please try again.');
    }
  };

  // Navigate to Sign-In
  const handleSignInRedirect = () => {
    navigate('/signin');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }

    if (!email || !password || !passwordConfirmation) {
      setError('Please fill in all fields.');
      return;
    }

    console.log('Form Submitted:', { email, password });
    navigate('/profile');
  };

  return (
    <div className="setBgpg">
    <div className="signup-page">
      <h2>Sign up</h2>
      {error && <div className="error-message">{error}</div>}
      <p>
        Already have an account?{' '}
        <button onClick={handleSignInRedirect}>Sign in</button>
      </p>

      <div className="social-buttons">
        {/* Google Login */}
        <GoogleLogin
          onSuccess={handleGoogleSignup}
          onError={() => setError('Google Signup failed, please try again.')}
          clientId={googleClientId} // Use client ID from props
        />

        {/* Microsoft Login */}
        <button
          className="social-button microsoft"
          onClick={handleMicrosoftSignup}
        >
          Sign up with Microsoft
        </button>

        {/* GitHub Login */}
        <GitHubLogin
          clientId={githubClientId} // Pass clientId from props
          onSuccess={handleGitHubSignup}
          onFailure={handleGitHubSignup}
          redirectUri="http://localhost:3000/auth/github/callback"
          className="social-button github"
        />

        {/* Facebook Login */}
        <FacebookLogin
          appId={facebookClientId} // Pass appId from props
          autoLoad={false}
          fields="name,email,picture"
          callback={handleFacebookSignup}
          cssClass="social-button facebook"
          textButton="Sign up with Facebook"
        />
      </div>

      <div className="divider">OR</div>

      {/* Traditional Sign-Up Form */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password confirmation"
          required
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default SignUpPage;
