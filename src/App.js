import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import WelcomePage from './WelcomePage';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import SignInPage from './SignInPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import NotFoundPage from './NotFoundPage';
import OAuthCallbackPage from './OAuthCallbackPage';
import HabitCreationPage from './HabitCreationPage';
import HabitTracker from './HabitTracker';
import { HabitProvider } from './HabitContext';

const googleClientId = "311915896682-1e0o6j0miud1011lu75ro26i985v4r06.apps.googleusercontent.com";
const microsoftClientId = process.env.REACT_APP_MICROSOFT_CLIENT_ID;
const githubClientId = "3a80d52a16e83f0dc687dbcad4198bd95ccaff69";
const facebookClientId = "Ov23lioYf0p1cubEBmGk";

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {/* Wrap the entire application with HabitProvider */}
      <HabitProvider>
        <Router>
          <Routes>
            {/* Define route paths properly */}
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/signup"
              element={<SignUpPage googleClientId={googleClientId} githubClientId={githubClientId} facebookClientId={facebookClientId} />}
            />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth" element={<OAuthCallbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
            
            {/* Corrected duplicate route for profile */}
            <Route path="/create-habit" element={<HabitCreationPage />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
          </Routes>
        </Router>
      </HabitProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
