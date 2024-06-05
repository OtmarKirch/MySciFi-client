import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserProfile } from "../user-profile/user-profile";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FavoriteMovies } from "../favorite-movies/favorite-movies";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const dbUrl =
      "https://quiet-bastion-19832-9b36523e0b42.herokuapp.com/movies";
    fetch(dbUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movieData) => {
        const movieList = movieData.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            director: doc.director.name,
            directorText: doc.director.description,
            genre: doc.genre.name,
            genreText: doc.genre.description,
            imgUrl: doc.imgUrl,
            description: doc.description,
          };
        });
        setMovies(movieList);
      })
      .catch((error) => console.error("Error:", error));
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route path="/signup" element={<SignupView />} />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list ist empty!</Col>
                ) : (
                  <>
                    <Col md={8}>
                      <MovieView
                        user={user}
                        updateUserData={(userData) => {
                          setUser(userData);
                        }}
                        moviesData={movies}
                        token={token}
                      />
                    </Col>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>List ist empty</Col>
                ) : (
                  <>
                    <>
                      sort by:
                      <Button
                        className="m-1"
                        variant="primary"
                        onClick={() => setSortBy("genre")}
                      >
                        Genre
                      </Button>
                      <Button
                        className="m-1"
                        variant="primary"
                        onClick={() => setSortBy("director")}
                      >
                        Director
                      </Button>
                      <Button
                        className="m-1"
                        variant="primary"
                        onClick={() => setSortBy("")}
                      >
                        None
                      </Button>
                    </>
                    <>
                      {movies
                        .sort((a, b) => {
                          switch (sortBy) {
                            case "genre":
                              return a.genre.localeCompare(b.genre);
                            case "director":
                              return a.director.localeCompare(b.director);
                            default:
                              return 0;
                          }
                        })
                        .map((movie, i) => (
                          <React.Fragment key={movie.id}>
                            {(i === 0 ||
                              (i > 0 &&
                                movies[i - 1][sortBy] !== movie[sortBy])) && (
                              <h3>{movie[sortBy]}</h3>
                            )}
                            <Col className="mb-4" md={3}>
                              <MovieCard userData={user} movieData={movie} />
                            </Col>
                          </React.Fragment>
                        ))}
                    </>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <UserProfile
                    user={user}
                    token={token}
                    importNewUserData={(user) => {
                      setUser(user);
                    }}
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  />
                )}
              </>
            }
          ></Route>
          <Route
            path="/favoriteMovies"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <FavoriteMovies
                      userData={user}
                      setUserData={setUser}
                      moviesData={movies}
                    />
                  </>
                )}
              </>
            }
          ></Route>
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
