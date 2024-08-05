import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Noimage from "../assets/no-image.png";
import { AiOutlineLike } from "react-icons/ai";
import { likeMovie, reset } from "../features/movies/movieSlice";

// Define the mapping of genre IDs to names
const GenreNames = {
  28: "Acción",
  12: "Aventura",
  16: "Animación",
  35: "Comedia",
  80: "Crimen",
  99: "Documental",
  18: "Drama",
  10751: "Familiar",
  14: "Fantasía",
  36: "Historia",
  27: "Terror",
  10402: "Música",
  9648: "Misterio",
  10749: "Romance",
  878: "Ciencia Ficción",
  10770: "Película para TV",
  53: "Suspenso",
  10752: "Guerra",
  37: "Western",
};

const MovieCard = ({ movies, handleDelete, handleUpdate, showActions }) => {
  const URL_IMG = "https://image.tmdb.org/t/p/w500";

  const dispatch = useDispatch();

  const handleLike = (id) => {
    dispatch(likeMovie(id));
  };

  return (
    <div className="movie-container">
      {movies.map((movie) => {
        let imgSrc;

        if (movie.poster_path && movie.poster_path.startsWith("/")) {
          imgSrc = `${URL_IMG}${movie.poster_path}`;
        } else if (movie.poster_path && movie.poster_path.startsWith("http")) {
          imgSrc = movie.poster_path;
        } else {
          imgSrc = Noimage;
        }

        // Transform genre_ids to genre names
        const genreNames = movie.genre_ids
          .map((id) => GenreNames[id])
          .filter((name) => name) // Remove undefined values
          .join(", ");

        return (
          <div key={movie._id} className="card">
            <div className="card-content">
              <div className="card-image">
                <img
                  src={imgSrc}
                  alt={movie.title}
                  className="custom-card-img"
                />
              </div>
              <div className="card-info">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  <strong>Sinopsis: </strong>
                  {movie.overview || "No description available"}
                </p>
                <p>
                  <strong>Géneros:</strong>{" "}
                  {genreNames || "No genres available"}
                </p>
              </div>
              <div className="card-details">
                <p>
                  <strong>Calificación:</strong> {movie.vote_average}
                </p>
                <p>
                  <strong>Fecha de Estreno:</strong>{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Popularidad:</strong> {movie.popularity}
                </p>
                <p>
                  <strong>Votos:</strong> {movie.vote_count}
                </p>
                {movie.trailer_url && (
                  <p>
                    <strong>Tráiler:</strong>{" "}
                    <a
                      href={movie.trailer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver tráiler
                    </a>
                  </p>
                )}
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleLike(movie._id)}
                >
                  <AiOutlineLike /> Like {movie.likes.length}
                </button>
                {showActions && (
                  <div className="actions">
                    <Link
                      to={`/update-movie/${movie._id}`}
                      className="btn btn-dark"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCard;
