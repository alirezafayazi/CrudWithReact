import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reqres.in/api/',
    timeout: 6000,
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json'
    }
});

instance.interceptors.request.use(
    config => config ,
    error =>  Promise.reject(error)
);

instance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response)
);


export default instance;