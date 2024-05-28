import { useState, useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserProfile } from "../user-profile/user-profile";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://sci-fi-app.onrender.com/movies/", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
      .catch((error) => console.error("Error:", error));
  }, [token]);

  return (
    <BrowserRouter>
    <NavigationBar 
      user={user}
      onLoggedOut={()=>{
        setUser(null)
        setToken(null)
        localStorage.clear()
      }}
    />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (<Navigate to="/" />):(
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
              <SignupView />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
              ): movies.length === 0 ? (
              <Col>The list ist empty!</Col>
            ):(
            <>
            <Col md={8}>
              <MovieView moviesData={movies} />
            </Col>
            </>)
          }
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
              {!user ? (
              <Navigate to="/login" replace />
              ):movies.length === 0 ? (<Col>List ist empty</Col>):(
                <>
                {movies.map((movie)=>(
                  <Col className="mb-4" key={movie.id} md={3}>
                  <MovieCard 
                  key={movie.id}
                  movieData={movie}
                   />
                  </Col>))}
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
              ):(
                <UserProfile
                user={user}
                token={token}
                importNewUserData={(user)=>{setUser(user)}}
                onLoggedOut={()=>{
                  setUser(null)
                  setToken(null)
                  localStorage.clear()
                }} />
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
