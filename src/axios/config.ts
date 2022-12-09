import  axios from "axios";

export const Service = axios.create({
  baseURL: 'http://localhost:5055/api',
})