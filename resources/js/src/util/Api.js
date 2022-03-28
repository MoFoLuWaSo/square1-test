import axios from 'axios';
import {API_BASE_URL} from "../constants/ServerUrl";



export default axios.create({
  baseURL: API_BASE_URL + "api",
  headers: {
    'Content-Type': 'application/json',
  }
});
