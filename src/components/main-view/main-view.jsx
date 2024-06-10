import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserProfile } from "../user-profile/user-profile";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FavoriteMovies } from "../favorite-movies/favorite-movies";
import "./main-view.scss";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    //fetch data only if user is logged in and token is available
    if (!token) {
      return;
    }
    //fetch movies from database
    const dbUrl = "https://quiet-bastion-19832-9b36523e0b42.herokuapp.com/movies";
    fetch(dbUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movieData) => {
        //convert data to format that can be used by components
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
        //set state of movies with fetched data
        setMovies(movieList);
      })
      .catch((error) => console.error("Error:", error));
  }, [token]);

  //set up all routes of app and pass props to components
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
          <Route
            path="/signup"
            element={
              <Col md={5}>
                <SignupView />
              </Col>
            }
          />
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
                      <Row>
                        <Form >
                          <Form.Group controlId="movieSearch">
                            <Form.Label>Search</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Search for title, genre or director"
                            aria-label="Search for title, genre or director"
                            aria-required="false"
                            onChange={(e) => {
                              const search = e.target.value.toLowerCase();
                              setSelectedMovies(
                                movies.filter((movie) => {
                                  return (
                                    movie.title.toLowerCase().includes(search) ||
                                    movie.director.toLowerCase().includes(search) ||
                                    movie.genre.toLowerCase().includes(search)
                                  );
                                })
                              );
                            }}
                          />
                          </Form.Group>
                        </Form>
                      </Row>
                    </>
                    <>
                      {selectedMovies.length === 0 ? (
                        movies.map((movie) => (
                          <React.Fragment key={movie.id}>
                            <Col className="mb-4 mt-2" md={3}>
                              <MovieCard userData={user} movieData={movie} />
                            </Col>
                          </React.Fragment>
                        ))
                      ) : (
                        selectedMovies.map((movie) => (
                          <React.Fragment key={movie.id}>
                            <Col className="mb-4 mt-2" md={3}>
                              <MovieCard userData={user} movieData={movie} />
                            </Col>
                          </React.Fragment>
                        )))}
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
                  <>
                    <Col>
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
                    </Col>
                    <h2 className="text-center mt-4 mb-3">
                      Your Favorite Movies
                    </h2>
                    <FavoriteMovies userData={user} moviesData={movies} />
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
