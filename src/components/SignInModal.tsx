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
        <p>Sign in using one of the below identity providers to start syncing your schedules across devices.</p>
        {/* Here you would put the logic to handle sign-in, for now, they are just buttons */}
        <button className="sign-in-button">Sign in with email</button>
        <button className="sign-in-button">Sign in with Google</button>
        <button className="sign-in-button">Sign in with GitHub</button>
        <button onClick={onClose} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default SignInModal;
