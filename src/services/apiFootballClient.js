import axios from 'axios';

const apiFootballClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  timeout: 12_000,
  headers: {
    'x-apisports-key': process.env.APISPORTS_KEY,
  },
});

export default apiFootballClient;
