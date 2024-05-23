import React, { useEffect } from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";


const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    /* if (!token) {
      return;
    } */
    fetch(
      "https://sci-fi-app.onrender.com/movies/"
      // {headers: {Authorization: `Bearer ${token}`}}
    )
      .then((response) => (movieData = response.json()))
      .then((movieData) => {
        const movieList = movieData.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            director: doc.director.name,
            genre: doc.genre.name,
            imgUrl: doc.imgUrl,
            description: doc.description,
          };
        });
        setMovies(movieList);
      })
      .catch(error => console.error("Error:", error));
  }, [token]);

 if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
        User={user}
      />
    );
  }


  //if user has selected a movie, show details of that movie
  if (selectedMovie) {
    const similarMoviesGenre = movies.filter((movie) => {
      return movie.genre === selectedMovie.genre && movie.title != selectedMovie.title;
    });
    const similarMoviesDirector = movies.filter((movie) => {
      return movie.director === selectedMovie.director && movie.title != selectedMovie.title;
    });
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
          }}
        >
          Log Out
        </button>
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
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
        <h2>Movies from the Director</h2>
        {similarMoviesDirector.map((movie) => (
          <MovieCard
            key={movie._id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
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
            <button
              onClick={() => {
                setUser(null);
                setToken(null);
              }}
            >
              Log Out
            </button>
      {movies.map((movie) => {
        return (
          <>
            <MovieCard
              key={movie.id}
              movieData={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </>
        );
      })}
    </div>
  );
};

export default MainView;
