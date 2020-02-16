import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class WeatherAPI {
  static getWeather(url) {
    console.log("came here to axios==================")
    let res = axios.get(`${baseUrl}?${url}`);
    return res
  }
}
export default WeatherAPI;