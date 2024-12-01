import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Url } from '../../url';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ offset: 200, duration: 1500, easing: 'ease-in-out', delay: 50 });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${Url}/api/v1/forgot-password`, { email });
            setMessage('Please check your email');
            setError('');
            setCountdown(60);
        } catch (err) {
            console.error('Error:', err.response ? err.response.data : err.message);
            setError('Failed to send password reset email.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    // Auto clear messages after 1min seconds
    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage('');
            setError('');
        }, 60000);
        return () => clearTimeout(timeout);
    }, [message, error]);

    // Countdown and redirect after successful submission
    useEffect(() => {
        if (message && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            if (countdown === 1) {
                navigate('/');
            }

            return () => clearInterval(timer);
        }
    }, [message, countdown, navigate]);

    return (
        <div className="container mt-6 mb-6 max-w-md mx-auto" data-aos="fade-down">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded text-center mb-4">
                        <p>{message} <span className='text-red-600'>{countdown}</span> seconds...</p>
                    </div>
                )}
                {error && <p className="bg-red-100 text-red-700 p-3 rounded text-center mb-4">{error}</p>}

                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#FF7E29] focus:ring-0 "
                        placeholder="Enter your email"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Now'}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
