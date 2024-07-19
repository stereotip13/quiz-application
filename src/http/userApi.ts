import { $host } from '.';


//здесь реализуется ф-ал регистрации, авторизации и проверки токена на валидность
import { AxiosResponse } from 'axios';

interface UserCredentials {
    snils: string;
    password: string;
    name: string;
    otdel: string;
    rating: number;
}
interface LoginCredentials {
    snils: string;
    password: string;
}

export const registration = async ({ snils, password, name, otdel, rating }: UserCredentials): Promise<AxiosResponse> => {
    const response: AxiosResponse = await $host.post('http://localhost:5001/auth/register', { snils, password, name, otdel, rating });
    return response;
};
export const login = async ({ snils, password }: LoginCredentials): Promise<AxiosResponse> => {
    const response: AxiosResponse = await $host.post('http://localhost:5001/auth/login', { snils, password });
    return response;
};

