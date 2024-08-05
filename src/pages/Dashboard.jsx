import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getAllMovies, reset } from "../features/movies/movieSlice";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";
import { IoIosCreate } from "react-icons/io";
import { FaFilm } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { movies, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/");
    } else {
      dispatch(getAllMovies());
    }

    return () => {
      dispatch(reset()); // Limpia el estado cuando el componente se desmonte
    };
  }, [dispatch, navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading container">
      <h3 className="welcome-message">Bienvenido {user && `@${user.nombre}`}</h3>
        <p>Dashboard de Películas</p>
        <Link to="/create-movie" className="btn btn-block btn-primary">
          <IoIosCreate /> Create Movie
        </Link>
        <Link to="/my-movies" className="btn btn-block btn-secondary">
          <FaFilm /> My Movies
        </Link>
      </section>
      <section className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>{message}</p>
        ) : (
          <>
            {movies.length === 0 ? (
              <p>No hay películas disponibles.</p>
            ) : (
              <MovieCard movies={movies} showActions={false} />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
