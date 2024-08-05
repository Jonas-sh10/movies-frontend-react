import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "./movieService";

const initialState = {
    movies: [], // Estado inicial vacío para películas
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// Crear una nueva película
export const createMovie = createAsyncThunk('movies/create', async (movieData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await movieService.createMovie(movieData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Obtener todas las películas
export const getAllMovies = createAsyncThunk('movies/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await movieService.getAllMovies(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Obtener pelicula por usuario
export const getMovie = createAsyncThunk('movies/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await movieService.getMovie(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Actualizar una película
export const updateMovie = createAsyncThunk('movies/update', async ({ id, movieData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await movieService.updateMovie(id, movieData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Eliminar una película
export const deleteMovie = createAsyncThunk('movies/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await movieService.deleteMovie(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Like o dislike una película
export const likeMovie = createAsyncThunk('movies/like', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await movieService.likeMovie(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMovie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.movies.push(action.payload);
            })
            .addCase(createMovie.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.movies = action.payload;
            })
            .addCase(getAllMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMovie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMovie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.movies = action.payload;
            })
            .addCase(getMovie.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateMovie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.movies.findIndex(movie => movie.id === action.payload.id);
                if (index !== -1) {
                    state.movies[index] = action.payload;
                }
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteMovie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.movies = state.movies.filter((movie) => movie._id !== action.payload);
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(likeMovie.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(likeMovie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                // Encuentra la película en el estado y actualiza la lista de likes
                state.movies = state.movies.map(movie =>
                    movie._id === action.payload.movieId
                        ? {
                            ...movie,
                            likes: movie.likes.includes(action.payload.userId)
                                ? movie.likes.filter(id => id !== action.payload.userId) // Si ya está en la lista, lo eliminamos
                                : [...movie.likes, action.payload.userId] // Si no está en la lista, lo agregamos
                        }
                        : movie
                );
            })
            .addCase(likeMovie.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = movieSlice.actions;
export default movieSlice.reducer;

