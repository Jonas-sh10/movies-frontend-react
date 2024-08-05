import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, updateMovie, reset } from "../features/movies/movieSlice";
import MovieForm from "../components/MovieForm";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams(); // Obtener el ID de la película desde los parámetros de la URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    release_date: "",
    poster_path: "",
    vote_average: "",
    vote_count: "",
    popularity: "",
    genre_ids: [],
    trailer_url: "", // Añadir trailer_url
  });

  const { user } = useSelector((state) => state.auth);
  const { movies, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/");
    } else {
      dispatch(getMovie());
    }
    return () => {
      dispatch(reset()); // Limpiar el estado cuando se desmonte el componente
    };
  }, [dispatch, navigate, user, isError, message]);

  useEffect(() => {
    if (movies.length > 0) {
      const movieToEdit = movies.find((movie) => movie._id === id);
      if (movieToEdit) {
        // Convertir la fecha al formato YYYY-MM-DD
        const formattedDate = new Date(movieToEdit.release_date)
          .toISOString()
          .split("T")[0];
        setFormData({
          title: movieToEdit.title,
          overview: movieToEdit.overview,
          release_date: formattedDate,
          poster_path: movieToEdit.poster_path,
          vote_average: movieToEdit.vote_average,
          vote_count: movieToEdit.vote_count,
          popularity: movieToEdit.popularity,
          genre_ids: movieToEdit.genre_ids,
          trailer_url: movieToEdit.trailer_url || "", // Manejar trailer_url
        });
      }
    }
  }, [movies, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Para el campo de géneros, manejar múltiples selecciones
    if (name === "genre_ids") {
      const options = Array.from(e.target.options);
      const selectedGenres = options
        .filter((option) => option.selected)
        .map((option) => parseInt(option.value, 10));
      setFormData({ ...formData, genre_ids: selectedGenres });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMovie({ id, movieData: formData }))
      .unwrap()
      .then(() => {
        toast.success("Película actualizada");
        navigate("/dashboard");
      });
  };

  return (
    <MovieForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      modo="update"
    />
  );
};

export default UpdateMovie;
