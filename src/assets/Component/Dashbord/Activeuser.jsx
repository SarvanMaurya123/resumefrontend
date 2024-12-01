// src/components/ActiveUser.js

import { useState, useEffect } from 'react';
import { useAuth } from '../../ContaxtApi/useAuth';
import { fetchUserCounts } from '../Dashbord/Api/Apis';

const ActiveUser = () => {
    const [userCounts, setUserCounts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const getUserCounts = async () => {
            try {
                const data = await fetchUserCounts(token);
                setUserCounts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            getUserCounts();
        } else {
            setError('Not authenticated');
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    const { activeUsers = 0 } = userCounts || {};

    return (
        <div>
            <p className='text-3xl text-center text-fuchsia-600 pulse-effect'>{activeUsers}</p>
        </div>
    );
};

export default ActiveUser;
