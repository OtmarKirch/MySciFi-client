import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { movies as movieList } from "../../data/movies";

const MainView = () => {
  const [movies, setMovies] = useState(movieList);

  const [selectedMovie, setSelectedMovie] = useState(null);

  //if user has selected a movie, show it
  if (selectedMovie) {
    console.log("test");
    return (
      <MovieView
        movieData={selectedMovie}
        onBackButton={() => {
          setSelectedMovie(null);
        }}
      />
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
