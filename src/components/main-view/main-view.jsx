import React, { useEffect } from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://sci-fi-app.onrender.com/movies/")
      .then((response) => (movieData = response.json()))
      .then((movieData) => {
        const movieList = movieData.map((doc) => {
          return {
            title: doc.title,
            director: doc.director.name,
            genre: doc.genre.name,
            imgUrl: doc.imgUrl,
            description: doc.description,
          };
        });
        setMovies(movieList);
      });
  });

  const [selectedMovie, setSelectedMovie] = useState(null);

  //if user has selected a movie, show it
  if (selectedMovie) {
    const similarMoviesGenre = movies.filter((movie) => {
      return movie.genre === selectedMovie.genre;
    });
    const similarMoviesDirector = movies.filter((movie) => {
      return movie.director === selectedMovie.director;
    })
    return (
      <>
        <MovieView
          movieData={selectedMovie}
          onBackButton={() => {
            setSelectedMovie(null);
          }}
        />
        <h2>Movies in the Genre</h2>
        {similarMoviesGenre.map((movie) => (
          <MovieCard
          key={movie.id}
          movieData={movie}
          onMovieClick={(newSelectedMovie)=>{
            setSelectedMovie(newSelectedMovie)
          }}
          />
        ))}
        <h2>Movies from the Director</h2>
        {similarMoviesDirector.map((movie) => (
          <MovieCard
          key={movie.id}
          movieData={movie}
          onMovieClick={(newSelectedMovie)=>{
            setSelectedMovie(newSelectedMovie)
          }}
          />
        ))}
      </>
    );
  }

  //if there are no movies, show this alternative text
  if (movies.length === 0) {
    return <div>Movie list is empty!</div>;
  }

  //as default, show the list of all movies
  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};

export default MainView;
