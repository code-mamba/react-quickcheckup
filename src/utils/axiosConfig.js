import axios from 'axios';
import LoadingIndicator from 'src/components/utils/atoms/LoadingIndicator/LoadingIndicator';
import ReactDOM  from 'react-dom';


let requestsCounter = 0;

const showLoadingIndicator = () =>{
    if(requestsCounter === 0){
        const indicator = document.createElement('div');
        indicator.id = 'loading-indicator';
        document.body.appendChild(indicator)
        ReactDOM.render(<LoadingIndicator/>,indicator)
    }
    requestsCounter+=1
}
const hideLoadingIndicator = () => {
    requestsCounter -= 1;
    if (requestsCounter <= 0) {
      const indicator = document.getElementById('loading-indicator');
      if (indicator) {
        ReactDOM.unmountComponentAtNode(indicator);
        indicator.remove();
      }
      requestsCounter = 0;
    }
  };
const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
    headers:{
        'Content-type': 'application/json'
    }
})

instance.interceptors.request.use(
    (config)=>{
        showLoadingIndicator()
        return config;
    },
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
            case 404:
            case 409:
                return Promise.reject(error.response?.data)
            case 401:
                return Promise.reject(error)
            case 500:
            case 502:
                return Promise.reject("Something went wrong. Please Try again")
            default:
                return Promise.reject(error.response?.data)
        }
        
    }
)

export default instance