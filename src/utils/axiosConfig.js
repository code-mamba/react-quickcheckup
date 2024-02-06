import axios from 'axios';
import LoadingIndicator from 'src/components/utils/atoms/LoadingIndicator/LoadingIndicator';
import ReactDOM  from 'react-dom';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
    headers:{
        'Content-type': 'application/json'
    }
})

instance.interceptors.request.use(
    (config)=>{
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response)=>{
        return response.data
    },
    (error)=>{
        switch(error.response?.status){
            case 400:
                throw Promise.reject({ message: 'Bad Request' });
            case 404:
                throw Promise.reject({ message: 'Not Found' });
            case 409:
                throw Promise.reject(error.response?.data)
            case 401:
                throw Promise.reject({ message: 'Conflict' });
            case 500:
            case 502:
                throw Promise.reject("Something went wrong. Please Try again")
            default:
              
        }
        
    }
)

export default instance