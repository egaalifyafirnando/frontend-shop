import axios from 'axios';

const Api = axios.create({
    // SET DEFAULT ENDPOINT API
    baseURL: 'http://localhost:8000/api',
});

export default Api;
