import axios from 'axios';

import { Url } from './url';// Replace with your actual API URL

export const getProfiles = async () => {
    const response = await axios.get(`${Url}/profiles`);
    return response.data;
};

export const getProfileById = async (id) => {
    const response = await axios.get(`${Url}/profiles/${id}`);
    return response.data;
};

export const createProfile = async (profileData) => {
    const response = await axios.post(`${Url}/profiles`, profileData);
    return response.data;
};

export const updateProfile = async (id, profileData) => {
    const response = await axios.patch(`${Url}/profiles/${id}`, profileData);
    return response.data;
};

export const deleteProfile = async (id) => {
    const response = await axios.delete(`${Url}/profiles/${id}`);
    return response.data;
};