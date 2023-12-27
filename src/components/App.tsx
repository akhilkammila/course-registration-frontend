import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import HomePage from './HomePage'; // Your typical homepage component
import ResetPasswordPage from './ResetPasswordPage'; // Your password reset component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/reset_password/:token" element={<ResetPasswordPage/>} />
        <Route path="/" element={<HomePage />}/>
      </Routes>
    </Router>
  );
};

export default App;
