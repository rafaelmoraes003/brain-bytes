import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Store from './pages/Store';
import './styles/index.css';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
