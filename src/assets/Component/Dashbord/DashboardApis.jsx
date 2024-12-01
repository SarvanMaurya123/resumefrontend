import { useEffect, useState } from 'react';
import axios from 'axios';
import { Url } from '../../../url';
import { useAuth } from '../../ContaxtApi/useAuth'; // Adjust this import path as needed

const DashboardApis = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                //total user Api Call Here
                const response = await axios.get(`${Url}/api/v1/total-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTotalUsers(response.data.totalUsers);
            } catch (err) {
                console.error('Error fetching total users:', err);
                setError('Error fetching total users');
            }
        };

        if (token) {
            fetchTotalUsers();
        } else {
            setError('Not authenticated');
        }
    }, [token]);

    return (
        <div>
            {error ? (
                <p className='text-red-500'>{error}</p>
            ) : (
                <p className='text-3xl text-center text-fuchsia-600'>{totalUsers}</p>
            )}
        </div>
    );
};

export default DashboardApis;