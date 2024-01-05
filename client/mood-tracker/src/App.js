import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordResetRequest from './pages/PasswordResetRequest'; 
import ResetPassword from './pages/ResetPassword'; 
import Header from './components/Header';
import Entries from './components/Entries';
import MoodStatistics from './components/MoodStatistics';
import './styles/App.css';

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/reset-password" element={<PasswordResetRequest />} /> 
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/mood-statistics" element={<MoodStatistics />} />
                        <Route path="/entries" element={<Entries />} />
                    </Routes>             
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}


export default App;

