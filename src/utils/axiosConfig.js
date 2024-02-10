import axios from 'axios';
import LoadingIndicator from 'src/components/atoms/LoadingIndicator/LoadingIndicator';
import ReactDOM  from 'react-dom';

let loadingIndicator = false
const showLoadingIndicator = () =>{
    if(!loadingIndicator){
        
        loadingIndicator = document.createElement('div');
       
        document.body.appendChild(loadingIndicator)
        ReactDOM.render(<LoadingIndicator/>,loadingIndicator)
    }
}
const hideLoadingIndicator = () =>{
   if(loadingIndicator){
    ReactDOM.unmountComponentAtNode(loadingIndicator)
    document.body.removeChild(loadingIndicator)
    loadingIndicator = null
   }
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
    headers:{
        'Content-type': 'application/json'
    }
})

instance.interceptors.request.use(
    (config)=>{
        showLoadingIndicator();
        return config},
    (error) =>{
        hideLoadingIndicator()
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response)=>{
        hideLoadingIndicator()
        return response.data
    },
    (error)=>{
        hideLoadingIndicator()
        switch(error.response?.status){
            case 400:
                throw Promise.reject({ message: 'Bad Request' });
            case 404:
                throw Promise.reject({ message: 'Not Found' });
            case 409:
                throw Promise.reject({message: 'Conflict'})
            case 401:
                throw Promise.reject({ message: 'Unauthorized'});
            case 500:
            case 502:
                throw Promise.reject("Something went wrong. Please Try again")
            default:
                throw Promise.reject(error.response?.data)
              
        }
        
    }
)

export default instance