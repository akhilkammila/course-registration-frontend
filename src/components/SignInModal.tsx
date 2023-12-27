// SignInModal.tsx
import React, { useState } from 'react';
import './SignInModal.css';

interface SignInModalProps {
  onClose: () => void;
  onSignInSuccess: (email: string) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose, onSignInSuccess }) => {
  const [action, setAction] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [feedback, setFeedback] = useState('');

  const apiBaseUrl = 'http://127.0.0.1:5000';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        onSignInSuccess(email);
        setFeedback('Successfully signed in!')
      }
      else {
        setFeedback('Incorrect email or password.');
      }

    } catch (error) {
      setFeedback('An error occurred.');
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/create_account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setFeedback('Verification email sent. Click link, then log in.')
      } else {
        setFeedback('Account with email already exists.');
      }

    } catch (error) {
      setFeedback('An error occurred.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/request_reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setFeedback('If account exists, reset email sent.')
      } else {
        setFeedback('Error occured.')
      }
    } catch (error) {
      setFeedback('An error occured.')
    }
  };

  const renderForm = () => {
    switch (action) {
      case 'signin':
        return (
          <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="modal-submit-button">Sign In</button>
          </form>
        );
      case 'create':
        return (
          <form onSubmit={handleCreateAccount}>
            <h2>Create Account</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="modal-submit-button">Create Account</button>
          </form>
        );
      case 'reset':
        return (
          <form onSubmit={handleResetPassword}>
            <h2>Reset Password</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit" className="modal-submit-button">Reset Password</button>
          </form>
        );
      default:
        return (
          <>
            <h2>Sign in</h2>
            <button onClick={() => setAction('signin')} className="modal-option-button">Sign in with email</button>
            <button onClick={() => setAction('create')} className="modal-option-button">Create account with email</button>
            <button onClick={() => setAction('reset')} className="modal-option-button">Reset password</button>
          </>
        );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {renderForm()}
        {feedback && <div className="modal-feedback">{feedback}</div>}
        <button onClick={onClose} className="modal-cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default SignInModal;
