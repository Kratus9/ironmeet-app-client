import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5005/api"
})


service.interceptors.request.use((config) => {



  const storedToken = localStorage.getItem("authToken")

  
  if (storedToken) {
    config.headers.authorization = `Bearer ${storedToken}`
  }

  
  return config

})


export default service