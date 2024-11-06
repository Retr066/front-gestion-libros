import axios, { AxiosError, AxiosResponse } from 'axios'
import { HttpMethod } from '../enums/HttpMethod';
import { tokenKey } from '../constants/token';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    });


 axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(tokenKey);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


 axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem(tokenKey);
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);


export const API  = (method:HttpMethod, url:string, data?:any) => {
    return axiosInstance({
        method,
        url,
        data,
    });
}


