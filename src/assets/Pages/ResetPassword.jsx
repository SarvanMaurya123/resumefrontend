import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Url } from '../../url'; // Ensure this URL is correctly set in your environment
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('reset');
    const [password, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setError('Invalid token');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true); // Start loading

        try {
            const response = await axios.post(`${Url}/api/v1/reset-password/${token}`, {
                password,
                confirmPassword,
            });
            console.log('response', response);
            navigate("/login");
            setMessage('Password has been reset successfully.');
            setError('');
        } catch (err) {
            console.error("API Error:", err.response ? err.response.data : err.message);
            setError('Failed to reset password. Ensure the token is valid and not expired.');
            setMessage('');
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <div className="container mb-10">
            <h2 className='text-center text-xl my-10 '>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="password"
                        id="newPassword"
                        placeholder='Enter New Password'
                        value={password}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        disabled={isLoading} // Disable while loading
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        placeholder='Enter Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isLoading} // Disable while loading
                    />
                </div>
                <button type="submit" disabled={isLoading}>Reset Password</button>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
