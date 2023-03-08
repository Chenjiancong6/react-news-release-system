// 网络请求相关

import axios from "axios"
import { store } from "../redux/store"

// 网络请求前缀，统一在这里处理
axios.defaults.baseURL = "http://localhost:5555"

// interceptor: 拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    store.dispatch({ type: 'onLoading' })
    return config;
}, function (error) {
    // Do something with request error
    store.dispatch({ type: 'offLoading' })
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch({ type: 'offLoading' })
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch({ type: 'offLoading' })
    return Promise.reject(error);
});