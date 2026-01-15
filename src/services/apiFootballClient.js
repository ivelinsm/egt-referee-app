import axios from 'axios';

const apiFootballClient = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  timeout: 12_000,
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.RAPIDAPI_HOST,
  },
});

export default apiFootballClient;
