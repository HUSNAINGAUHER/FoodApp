import  { Axios } from "axios";

export const Service = new Axios({
  baseURL: 'https://consoleapplication.herokuapp.com/api',
})