import React from "react";
import Spinner from "./Spinner";

const MovieForm = ({ formData, onChange, onSubmit, isLoading, modo }) => {
  const {
    title,
    overview,
    release_date,
    poster_path,
    vote_average,
    vote_count,
    popularity,
    genre_ids,
    trailer_url, // Nuevo campo para URL del tráiler
  } = formData;

  return (
    <div className="movie-form-container">
      <div className="heading">
        <p>{modo === "create" ? "Crear Película" : "Actualizar Película"}</p>
      </div>

      <form onSubmit={onSubmit} className="movie-form">
        <div className="form-group">
          <label htmlFor="title">
            {modo === "create" ? "Título:" : "Actualizar Título:"}
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            placeholder="Ingrese el título"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="overview">
            {modo === "create" ? "Sinopsis:" : "Actualizar Sinopsis:"}
          </label>
          <textarea
            className="form-control"
            id="overview"
            name="overview"
            value={overview}
            placeholder="Ingrese la sinopsis"
            onChange={onChange}
            rows="5"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="release_date">
            {modo === "create"
              ? "Fecha de Estreno:"
              : "Actualizar Fecha de Estreno:"}
          </label>
          <input
            type="date"
            className="form-control"
            id="release_date"
            name="release_date"
            value={release_date}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="poster_path">
            {modo === "create" ? "Imagen (URL):" : "Actualizar Imagen (URL):"}
          </label>
          <input
            type="text"
            className="form-control"
            id="poster_path"
            name="poster_path"
            value={poster_path}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vote_average">
            {modo === "create" ? "Calificación:" : "Actualizar Calificación:"}
          </label>
          <input
            type="number"
            className="form-control"
            id="vote_average"
            name="vote_average"
            value={vote_average}
            placeholder="Ingrese la calificación"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vote_count">
            {modo === "create"
              ? "Recuento de Votos:"
              : "Actualizar Recuento de Votos:"}
          </label>
          <input
            type="number"
            className="form-control"
            id="vote_count"
            name="vote_count"
            value={vote_count}
            placeholder="Ingrese el recuento de votos"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="popularity">
            {modo === "create" ? "Popularidad:" : "Actualizar Popularidad:"}
          </label>
          <input
            type="number"
            className="form-control"
            id="popularity"
            name="popularity"
            value={popularity}
            placeholder="Ingrese la popularidad"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre_ids">
            {modo === "create" ? "Géneros:" : "Actualizar Géneros:"}
          </label>
          <select
            className="form-control"
            id="genre_ids"
            name="genre_ids"
            multiple
            value={genre_ids}
            onChange={onChange}
          >
            {/* Opciones de género */}
            <option value={28}>Acción</option>
            <option value={12}>Aventura</option>
            <option value={16}>Animación</option>
            <option value={35}>Comedia</option>
            <option value={80}>Crimen</option>
            <option value={99}>Documental</option>
            <option value={18}>Drama</option>
            <option value={10751}>Familiar</option>
            <option value={14}>Fantasía</option>
            <option value={36}>Historia</option>
            <option value={27}>Terror</option>
            <option value={10402}>Música</option>
            <option value={9648}>Misterio</option>
            <option value={10749}>Romance</option>
            <option value={878}>Ciencia Ficción</option>
            <option value={10770}>Película para TV</option>
            <option value={53}>Suspenso</option>
            <option value={10752}>Guerra</option>
            <option value={37}>Western</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="trailer_url">
            {modo === "create"
              ? "URL del Tráiler:"
              : "Actualizar URL del Tráiler:"}
          </label>
          <input
            type="text"
            className="form-control"
            id="trailer_url"
            name="trailer_url"
            value={trailer_url || ""} // Maneja null o undefined
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isLoading ? (
            <Spinner />
          ) : modo === "create" ? (
            "Crear Película"
          ) : (
            "Actualizar Película"
          )}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
