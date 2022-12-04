import  { Axios } from "axios";

export const Service = new Axios({
  baseURL: 'https://foodappbackend.herokuapp.com/api',
})