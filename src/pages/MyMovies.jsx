import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovie, deleteMovie, reset } from "../features/movies/movieSlice";
import { toast } from "react-toastify";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";

const MyMovies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { movies, isLoading, isError, message } = useSelector(
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
      dispatch(reset());
    };
  }, [dispatch, navigate, user]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <>
      <div className="heading container">
        <p>Mis Películas</p>
      </div>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>{message}</p>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="error-container">
              <p>No tienes ninguna película</p>
            </div>
          ) : (
            <div>
              <MovieCard
                movies={movies}
                handleDelete={handleDelete}
                showActions={true}
              ></MovieCard>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyMovies;
