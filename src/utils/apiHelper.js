import axios from "axios"

export const API =  {

    url: "http://54.152.182.89",

    login(email, password){
        return axios.post(this.url + "/public-api/login", {email,password});
    },

    getToken(){
        return localStorage.getItem('token');
    }
}