import axios from "axios";

const useApi = axios.create({
    // baseURL: "http://localhost/api",
    baseURL: "https://damatatechnology.com.br/api",
});

// Adicionar interceptor para enviar o token no cabeçalho
useApi.interceptors.request.use((config) => {
    const token =localStorage.getItem('token');

    if (token) {
        config.headers["Authorization"] = "Bearer "+token;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default useApi;
