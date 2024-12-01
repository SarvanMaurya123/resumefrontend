// src/api/userCounts.js

import axios from 'axios';
import { Url } from '../../../../url';

export const fetchUserCounts = async (token) => {
    try {
        const response = await axios.get(`${Url}/api/v1/active-user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success === false && !response.data.data) {
            throw new Error(response.data.message || 'Unexpected error occurred');
        }

        return response.data.status || {};
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Something went wrong. Please try again later.');
    }
};
