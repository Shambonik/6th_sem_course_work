import axios from 'axios';

export const instance = axios.create({
    baseURL: '/',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    },
});
