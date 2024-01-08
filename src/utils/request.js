import axios from "axios";
import { Message } from "element-ui";

const service = axios.create({
    // baseURL: 'http://localhost:8081/api',
    baseURL: '/api',
    // baseURL: 'http://8.134.184.196:8081/api',
    timeout: 5000 
});
// 请求拦截器
service.interceptors.request.use(
    config=>{
        // 从本地会话存储中取出令牌，设置到请求头，发送给服务器
        var token = window.sessionStorage.getItem('token');
        if( token ){
         config.headers['token'] = token;
        }      
        return config;
    },
    error=>{
      return Promise.reject(error);
    }
  );
//   响应拦截器
service.interceptors.response.use(
    response=>{
      return response.data;
    },
    error=>{
      //后面再加代码...
      return Promise.reject(error);
    }
  );
// 导出对象
  export default service;