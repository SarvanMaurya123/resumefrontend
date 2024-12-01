import { createContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { Url } from '../../url';
import Loader from '../../Loder';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = Cookies.get('accessToken');
        const storedUser = Cookies.get('user');

        if (storedToken && storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(userData);
                setIsLoggedIn(true);
            } catch (e) {
                console.error("Error parsing user data from cookies:", e);
                Cookies.remove('accessToken');
                Cookies.remove('user');
            }
        }

        // Set a timer to clear the token after 4 hours
        const timer = setTimeout(() => {
            Cookies.remove('accessToken');
            Cookies.remove('user');
            setToken(null);
            setUser(null);
            setIsLoggedIn(false);
        }, 4 * 60 * 60 * 1000); // 4 hours in milliseconds

        setLoading(false);

        // Cleanup timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const logout = useCallback(async () => {
        try {
            const response = await fetch(`${Url}/api/v1/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId: user?._id })
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            setIsLoggedIn(false);
            setUser(null);
            setToken(null);

            Cookies.remove('accessToken');
            Cookies.remove('user');
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Failed to log out. Please try again later.');
        }
    }, [token, user]);

    const login = useCallback(async (userData) => {
        try {
            setIsLoggedIn(true);
            setUser(userData.user);
            setToken(userData.accessToken);

            Cookies.set('accessToken', userData.accessToken, { expires: 1 / 6, secure: true, sameSite: 'Strict' }); // Set cookie to expire in 4 hours
            Cookies.set('user', JSON.stringify(userData.user), { expires: 1 / 6, secure: true, sameSite: 'Strict' });
        } catch (error) {
            console.error("Login failed:", error);
            alert('Login failed. Please try again.');
        }
    }, []);

    if (loading) {
        return <div><Loader /></div>;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext };
