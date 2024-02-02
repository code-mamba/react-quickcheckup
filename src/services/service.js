
import axios from 'src/utils/axiosConfig'

class Service {
  constructor() {
    this.domain = process.env.REACT_APP_API_BASE_URL;
  }

  joinURL(baseURL, url) {
    return `${baseURL}/${url}`;
  }

  async request(url, method = "POST", data = null) {
    url = this.joinURL(this.domain, url);

    try {
      const response = await axios({
        method,
        url,
        data: data ? { ...data } : undefined,
      });
      // console.log("fromget",response)
      return response;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
  post(url, data) {
    const method = "POST";
    return this.request(url, method, data);
  }
  get(url, id) {
    const method = "GET";
    if (id) {
      url = `${url}/${id}`;
    }
    return this.request(url, method);
  }
  delete(url, id) {
    const method = "DELETE";
    if (id) {
      url = `${url}/${id}`;
    }

    return this.request(url, method);
  }
  put(url, id, data) {
    const method = "PUT";
    if(id){
      url = `${url}/${id}`;
    }
    return this.request(url,method,data)
  }
  patch(url, id, data){
    const method = "PATCH";
    console.log("patching")
    console.log(url,id,data)
    if(id){
      url = `${url}/${id}`
    }
    return this.request(url, method, data)
  }
}
const service = new Service();
export default service;
