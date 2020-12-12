import axios from 'axios';
var httpClient = {};
httpClient.default = axios.create({
    baseURL:'http://127.0.0.1:8010'
})
httpClient.default.interceptors.response.use((res)=>{
    return res.data
})
export default httpClient;