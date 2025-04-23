import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.129.200:8080/api', // ou URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
