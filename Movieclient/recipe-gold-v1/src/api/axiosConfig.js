import axios from 'axios';

export default axios.create({
    baseURL: 'https://fdba-45-94-211-28.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
});