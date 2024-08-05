import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, reset } from "../features/movies/movieSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MovieForm from "../components/MovieForm";

const CreateMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    release_date: "",
    poster_path: "",
    vote_average: "",
    vote_count: "",
    popularity: "",
    genre_ids: [],
    trailer_url: "", // Nuevo campo para URL del tráiler
  });

  const {
    title,
    overview,
    release_date,
    poster_path,
    vote_average,
    vote_count,
    popularity,
    genre_ids,
    trailer_url, // Nuevo campo
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/");
    }
    dispatch(reset());
  }, [dispatch, navigate, user, isError, message, isSuccess]);

  const onChange = (e) => {
    const { name, value, type, files, multiple } = e.target;

    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else if (multiple) {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedOptions.map((val) => parseInt(val, 10)),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const movieData = {
      title,
      overview,
      release_date,
      poster_path,
      vote_average,
      vote_count,
      popularity,
      genre_ids,
      trailer_url: trailer_url || null, // Establece null si trailer_url está vacío
    };
    dispatch(createMovie(movieData))
      .unwrap()
      .then(() => {
        toast.success("Película creada");
        navigate("/dashboard");
      });
  };

  return (
    <MovieForm
      formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
      isLoading={isLoading}
      modo="create"
    />
  );
};

export default CreateMovie;
