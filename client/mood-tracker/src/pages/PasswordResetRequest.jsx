import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Auth.css';



const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/users/reset-password-request', { email });
            toast.success('Password reset email sent. Please check your inbox.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="reset-panel">
            <div className="panel-container">
                <img src={require('../assets/reset.png')} alt="Reset Password" />
                <h2>Forgot your password? Type your email here</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        className="input-field"
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <button type="submit" class="btn btn-block">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default PasswordResetRequest;
