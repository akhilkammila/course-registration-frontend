// App.tsx
import React, { useState } from 'react';
import Header from './Header';
import SignInModal from './SignInModal'; // Import the modal component
import CourseList from './CourseList'
import './App.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSignInSuccess = (email: string) => {
    setAccountName(email);
    setIsSignedIn(true); // Update the signed-in state
  };

  const handleSignOut = () => {
    // Here you would handle the sign-out logic
    setIsSignedIn(false);
    setAccountName('');
  };

  // You would have additional logic here for handling the actual sign-in
  // For example, after signing in:
  // setIsSignedIn(true);
  // setAccountName('User Name');

  return (
    <div className="App">
      <Header
        isSignedIn={isSignedIn}
        accountName={accountName}
        onSignIn={handleOpenModal}
        onSignOut={handleSignOut}
      />
      <CourseList/>
      {showModal && <SignInModal onClose={handleCloseModal} onSignInSuccess={handleSignInSuccess}/>}
    </div>
  );
}

export default App;
