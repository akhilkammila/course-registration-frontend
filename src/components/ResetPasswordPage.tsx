// ResetPasswordPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ResetPasswordPage.css'

const apiBaseUrl = 'http://127.0.0.1:5000';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [feedback, setFeedback] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/reset_password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setFeedback('Password reset successfully.');
      } else {
        setFeedback(data.message); // Error message from the server or a default one
      }


    } catch (error) {
        setFeedback('An error occurred while resetting the password.');
    }
  };

  return (
    <div className="resetPasswordContainer">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className="resetPasswordForm">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="resetPasswordInput"
        />
        <button type="submit" className="resetPasswordButton">Submit</button>
        {feedback && <div style={{ color: 'red' }}>{feedback}</div>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
