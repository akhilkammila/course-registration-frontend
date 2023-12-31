// ResetPasswordPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VerifyAccountPage.css'

const ResetPasswordPage = () => {
  const apiBaseUrl = process.env.REACT_APP_API_URL as string
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying email. Please wait...')

  useEffect(() => {
    fetch(`${apiBaseUrl}/verify_account/${token}`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {setMessage(data.message)})
    .catch(error => {setMessage('An error occured')})
  }, []);

  return (
    <div className="verifyEmailContainer">
      <h1>{message}</h1>
    </div>
  );
};

export default ResetPasswordPage;
