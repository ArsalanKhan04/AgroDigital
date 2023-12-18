// weatherApi.js
import axios from 'axios';

const API_KEY = '4b7e111b4dfdc027da454018c6d3c164';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const weatherApi = axios.create({
  baseURL: BASE_URL,
});

export const getCurrentWeather = async (city) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        q: city,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getWeatherForecast = async (city) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};

export const getHistoricalWeather = async (city, startDate, endDate) => {
  try {
    const response = await weatherApi.get('/onecall/timemachine', {
      params: {
        q: city,
        dt: startDate,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
};