import  axios from "axios";

export const Service = axios.create({
  baseURL: 'https://foodappbackend.herokuapp.com/api',
})