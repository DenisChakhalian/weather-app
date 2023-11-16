export const API_URL = 'https://api.openweathermap.org/data/2.5/';
export const API = import.meta.env.VITE_API_KEY;

export function getWeather(city) {
  return fetch(
    API_URL + 'weather' + '?appid=' + API + '&units=metric' + '&q=' + city
  ).then(response => response.json());
}

export function getWeatherByWeek(city) {
  return fetch(
    API_URL + 'forecast' + '?appid=' + API + '&units=metric' + '&q=' + city
  ).then(response => response.json());
}
