// SignInModal.tsx
import React, { useState } from 'react';
import './SignInModal.css';

interface SignInModalProps {
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  const [action, setAction] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle sign in
    console.log('Signing in with:', email, password);
    onClose(); // Close the modal after action
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle account creation
    console.log('Creating account with:', email, password);
    onClose();
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle password reset
    console.log('Resetting password for:', email);
    onClose();
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
        <button onClick={onClose} className="modal-cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default SignInModal;
