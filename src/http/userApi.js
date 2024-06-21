//здесь реализуется ф-ал регистрации, авторизации и проверки токена на валидность
import { $authHost,$host } from ".";
export const registration = async (snils, password, name, otdel, rating) =>{
    const response = await $host.post('auth/register', {snils,password,name, otdel, rating})
    return response
}
export const login = async (snils, password) =>{
    const response = await $host.post('auth/login', {snils,password})
    return response
}
export const createQuestion = async (text, right_ansv, wrong_answ1, wrong_answ2, wrong_answ3, category, difficulty) =>{
    const response = await $host.post('questions/crquest', {text, right_ansv, wrong_answ1, wrong_answ2, wrong_answ3, category, difficulty})
    return response
}