import axios from 'axios';

// Configuración de la URL base para la API
const API_URL = 'http://localhost:5000/api/v1/movies/';

// Crear una nueva película
const createMovie = async (movieData, token) => {
    const config = {
        headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`  // Agregar el token en el encabezado de la solicitud
        }
    };

    const response = await axios.post(API_URL, movieData, config);
    return response.data;  // Devuelve los datos de la película creada
};

// Obtener todas las películas del usuario
const getAllMovies = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`  // Agregar el token en el encabezado de la solicitud
        }
    };

    const response = await axios.get(`${API_URL}all`, config);
    return response.data;  // Devuelve una lista de todas las películas
};

// Obtener una película específica del usuario
const getMovie = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`  // Agregar el token en el encabezado de la solicitud
        }
    };

    const response = await axios.get(API_URL, config);
    return response.data;  // Devuelve los datos de la película solicitada
};

// Actualizar una película existente
const updateMovie = async (id, movieData, token) => {
    const config = {
        headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`  // Agregar el token en el encabezado de la solicitud
        }
    };

    const response = await axios.put(`${API_URL}${id}`, movieData, config);
    return response.data;  // Devuelve los datos actualizados de la película
};

// Eliminar una película
const deleteMovie = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`  // Agregar el token en el encabezado de la solicitud
        }
    };

    await axios.delete(`${API_URL}${id}`, config);
    return id;  // Devuelve el id de la película eliminada
};

const likeMovie = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`  // Agregar el token en el encabezado de la solicitud
        }
    };

    const response = await axios.post(`${API_URL}${id}/like`, {}, config);
    return response.data;
};

const movieService = {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    likeMovie
};

export default movieService;
