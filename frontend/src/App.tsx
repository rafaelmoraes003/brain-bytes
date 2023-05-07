import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Store from './pages/Store';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/home" element={<Home />} />
      <Route path="/store" element={<Store />} />
    </Routes>
  );
}

export default App;
