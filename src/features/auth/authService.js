import axios from "axios";

// Usa la variable de entorno para definir la URL base
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/`;

// Registrar Usuario
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData);
    return response.data;
};

// Login Usuario
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

// Logout usuario
const logout = () => {
    localStorage.removeItem("user");
}

const authService = {
    register,
    login,
    logout
};

export default authService;

