import axios from "axios";

// Api por defecto, cambiar
const api = axios.create({
    baseURL:'https://rvalencia.pythonanywhere.com/api'
});

export default api;