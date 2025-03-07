import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate OAuth callback handling
    console.log('OAuth callback handled');
    navigate('/profile');
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallbackPage;
