import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Auth.css';  // Importing the CSS

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { token } = useParams(); // Extracting token from route parameter

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            await axios.post('/api/users/reset-password', { token, password });
            toast.success('Password has been reset successfully');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="reset-panel">
            <div className="panel-container">
                <img src={require('../assets/change.png')} alt="Change Password" />
                <h2>Reset your password</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password" 
                        className="input-field-change-password"
                        placeholder="New Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        className="input-field-change-password"
                        placeholder="Confirm New Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                    <button type="submit" className="btn btn-block">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
