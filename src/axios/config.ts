import  { Axios } from "axios";

export const Service = new Axios({
   baseURL:'http://localhost:5055/api'
})