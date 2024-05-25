import { useState, useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { UserInfo } from "../user-info/user-info";
import { SignupView } from "../signup-view/signup-view";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          </Col>
          
          <Col md={5}>
            <SignupView />
          </Col>
        </>
      ) : selectedMovie ? (
        <>
          <Card className="mb-3 mt-3">
          <Button
            variant="primary"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Log Out
          </Button>
          </Card>
          <MovieView
            movieData={selectedMovie}
            movies={movies}
            onMovieClick={setSelectedMovie}
            onBackButton={() => {
              setSelectedMovie(null);
            }}
          />
        </>
      ) : movies.length === 0 ? (
        <>
          return <div>Movie list is empty!</div>;
        </>
      ) : (
        <>
        <Card className="mb-3 mt-3">
          <Button
            variant="primary"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Log Out
          </Button>
          </Card>
          {movies.map((movie) => {
            return (
              <>
                <Col className="mb-4" md={3}>
                  <MovieCard
                    key={movie.id}
                    movieData={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              </>
            );
          })}
        </>
      )}
    </Row>
  );
};

export default MainView;
