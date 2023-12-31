// Header.tsx
import React from 'react';
import './Header.css';

interface HeaderProps {
  isSignedIn: boolean;
  accountName: string;
  onSignIn: () => void;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSignedIn, accountName, onSignIn, onSignOut}) => {
  return (
    <header className="header">
      <div className="logo">GT Registration</div>
      <nav className="navigation">
        <a href="https://github.com/akhilkammila/course-registration-frontend" target="_blank" rel="noopener noreferrer" className="github-link">
          GitHub
        </a>
        {isSignedIn ? (
          <>
            <span className="account-name">{accountName}</span>
            <button onClick={onSignOut} className="sign-out-button">
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={onSignIn} className="sign-in-button">
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
