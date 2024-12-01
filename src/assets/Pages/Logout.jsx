import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextApi/Context'; // Ensure the path is correct

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await logout();
                navigate("/"); // Redirect to the home page or login page
            } catch (error) {
                console.error('Error logging out:', error);
                alert('Failed to log out. Please try again later.');
            }
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
