// SignInModal.tsx
import React from 'react';
import './SignInModal.css'; // Make sure to create a SignInModal.css file for styling

interface SignInModalProps {
  onClose: () => void; // Callback to close the modal
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign in</h2>
        <p>Sign in, or create an account, using email/password.</p>
        {/* Here you would put the logic to handle sign-in, for now, they are just buttons */}
        <button className="modal-sign-in-button">Sign in with email</button>
        <button className="modal-sign-in-button">Create account with email</button>
        <button className="modal-sign-in-button">Reset password</button>
        {/* <button className="modal-sign-in-button">Sign in with Google</button>
        <button className="modal-sign-in-button">Sign in with GitHub</button> */}

        <button onClick={onClose} className="modal-cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default SignInModal;
