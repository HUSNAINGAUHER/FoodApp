import  axios from "axios";

export const Service =  axios.create({
  baseURL: 'https://foodappbackend.heroku.com/api'
})