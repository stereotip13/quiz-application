// import axios from "axios"
// //для запросов к открытой части сайта
// const $host = axios.create({
//     baseURL:import.meta.env.VITE_REACT_APP_API_URL
// })
// //для запросов к закрытой части сайта
// const $authHost = axios.create({
//     baseURL:import.meta.env.VITE_REACT_APP_API_URL
// })
// //чтобы подставлять токен к каждому запросу есть интерцепторы - ф-ция кот параметрами принимает конфиг
// const authInterceptor = config => {
//     //в конфиге в поле хедерс добавляем header authoriz и указываем наш токен, который получаем из локального хранилища
//     config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// }
// //в authHost добавляем интерцептор для запроса, он будет отраб перед каждым запросом и подставлять в хедер авторизашн
// $authHost.interceptors.request.use(authInterceptor)

// export {
//     $host,
//     $authHost
// }
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

interface AxiosResponseData {
  // Определите структуру данных ответа, соответствующую вашему API
}

const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

const createAxiosInstance = (): AxiosInstance => axios.create({ baseURL });
//для запросов к открытой части сайта
const $host: AxiosInstance = createAxiosInstance();
//для запросов к закрытой части сайта
const $authHost: AxiosInstance = createAxiosInstance();

const authInterceptor = (config: any): any => {
  if (config.headers) {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')};`;
  }
  return config;
};
//в authHost добавляем интерцептор для запроса, он будет отраб перед каждым запросом и подставлять в хедер авторизашн
$authHost.interceptors.request.use(authInterceptor);

$host.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Токен истек или недействителен
      sessionStorage.removeItem('token');
      localStorage.removeItem('userName');
      window.location.href = '/'; // Используем window.location для полной перезагрузки
    }
    return Promise.reject(error);
  },
);

$host.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { $host, $authHost };
