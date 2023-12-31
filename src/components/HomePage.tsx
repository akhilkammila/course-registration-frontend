// App.tsx
import React, { useState } from 'react';
import Header from './Header';
import SignInModal from './SignInModal'; // Import the modal component
import CourseList from './CourseList'
import './HomePage.css';

function HomePage() {
  const apiBaseUrl = process.env.REACT_APP_API_URL as string

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
      <CourseList
        isSignedIn={isSignedIn}
        accountName={accountName}
        apiBaseUrl={apiBaseUrl}
      />
      {showModal && <SignInModal onClose={handleCloseModal} onSignInSuccess={handleSignInSuccess} apiBaseUrl={apiBaseUrl}/>}
    </div>
  );
}

export default HomePage;
