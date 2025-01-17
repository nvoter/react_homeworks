import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/user/:userId" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;