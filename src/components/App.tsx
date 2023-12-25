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

  const handleSignInClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        onSignIn={handleSignInClick}
        onSignOut={handleSignOut}
      />
      <CourseList/>
      {showModal && <SignInModal onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
