import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.204.64:8080/api', // ou URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
