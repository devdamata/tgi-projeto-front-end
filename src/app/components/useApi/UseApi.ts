import axios from "axios";

const useApi = axios.create({
    baseURL: "http://localhost/api",
});

// Adicionar interceptor para enviar o token no cabeçalho
useApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers["Authorization"] = token;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default useApi;
