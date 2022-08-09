import axios from 'axios'

const api = axios.create({
    // baseURL: 'https://62e06317fa8ed271c482d4fe.mockapi.io',
    baseURL: 'http://localhost:5000/api',
});

export const url = 'http://localhost:5000/img/'

export default api;