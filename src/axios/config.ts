import axios from 'axios'

export const Service = axios.create({
  baseURL: process.env.API_URL,
})
