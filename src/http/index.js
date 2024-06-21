import axios from "axios"

//для запросов к открытой части сайта
const $host = axios.create({
    baseURL:import.meta.env.VITE_REACT_APP_API_URL
})
//для запросов к закрытой части сайта
const $authHost = axios.create({
    baseURL:import.meta.env.VITE_REACT_APP_API_URL
})
//чтобы подставлять токен к каждому запросу есть интерцепторы - ф-ция кот параметрами принимает конфиг
const authInterceptor = config => {
    //в конфиге в поле хедерс добавляем header authoriz и указываем наш токен, который получаем из локального хранилища
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
//в authHost добавляем интерцептор для запроса, он будет отраб перед каждым запросом и подставлять в хедер авторизашн
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}