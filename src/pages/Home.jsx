import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesToShow = 4; // Número de películas a mostrar a la vez
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    // Obtener las películas populares de TMDB
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % Math.max(movies.length - moviesToShow + 1, 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.max(movies.length - moviesToShow + 1, 1)) %
        Math.max(movies.length - moviesToShow + 1, 1)
    );
  };

  const getVisibleMovies = () => {
    const startIndex = currentIndex;
    const endIndex = startIndex + moviesToShow;
    return movies.slice(startIndex, endIndex);
  };

  return (
    <>
      <main className="home-main">
        <section className="home-hero-section">
          <div className="home-hero-overlay">
            <div className="home-hero-content">
            </div>
          </div>
        </section>
        <section className="home-gallery-section">
          <h1 className="home-hero-title">
            Descubre Tu Próxima Película Favorita
          </h1>
          <p className="home-hero-description">
            Explora una amplia gama de películas y series de televisión.
            Encuentra el film perfecto para tu próxima visualización.
          </p>
          <h2 className="home-gallery-title">Películas Populares</h2>
          <div className="home-gallery-container">
            <button
              className="home-gallery-arrow home-gallery-arrow-left"
              onClick={prevSlide}
            >
              &lt;
            </button>
            <div className="home-gallery-wrapper">
              <div className="home-gallery-images">
                {getVisibleMovies().map((movie) => (
                  <img
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="home-gallery-image"
                  />
                ))}
              </div>
            </div>
            <button
              className="home-gallery-arrow home-gallery-arrow-right"
              onClick={nextSlide}
            >
              &gt;
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
