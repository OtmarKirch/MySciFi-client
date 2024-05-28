import PropTypes from "prop-types";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom"
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({user, updateUserData,
  moviesData, token
}) => {
  const {movieId} = useParams();

  const movieData = moviesData.find((movie) => {
    return (movie.id === movieId)
  })
  console.log(movieData)

  const handleNewMovieAdded = (event) => {
      event.preventDefault()

      const requestData = {
        Username: user.Username,
        favoriteMovie: movieData.title
      }

      console.log(JSON.stringify(requestData))

      fetch("https://sci-fi-app.onrender.com/users/favoritemovie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response) {
            //localStorage.setItem("user", JSON.stringify(data));
            //importNewUserData(data);
            //console.log("New name: " + user.name);
          }
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

  const altTextImage = "Movie poster of " + movieData.title
  const similarMoviesGenre = moviesData.filter((movie) => {
    return movie.genre === movieData.genre && movie.title != movieData.title;
  });
  const similarMoviesDirector = moviesData.filter((movie) => {
    return (
      movie.director === movieData.director && movie.title != movieData.title
    );
  });
  return (
    <div>
      <Row className="mb-4">
        <Card>
          <Card.Img alt={altTextImage} src={movieData.imgUrl} className="w-100" />
          <Card.Body>
            <Card.Title>{movieData.title}</Card.Title>
            <Card.Text>
              <div>{movieData.description}</div>
              <div>Director: {movieData.director}</div>
              <div>Genre: {movieData.genre}</div>
              <Link to="/">
              <Button
                variant="link"
              >
                Go back
              </Button></Link>
              <br />
        <Button 
        variant="primary"
        onClick={(e)=>{handleNewMovieAdded(e)}}
        >Add to favorite movies</Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <h2>Movies in the Genre</h2>
      <Row className="mb-6">
        {similarMoviesGenre.map((movie) => (
          <>
            <Col md={4}>
              <MovieCard
                key={movie.id}
                movieData={movie}
                noDescription={true}
              />
            </Col>
          </>
        ))}
      </Row>
      <h2>Movies from the Director</h2>
      <Row className="mb-6">
        {similarMoviesDirector.map((movie) => (
          <>
            <Col md={4}>
              <MovieCard
                key={movie.id}
                movieData={movie}
                noDescription={true}
              />
            </Col>
          </>
        ))}
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string,
    director: PropTypes.string,
    genre: PropTypes.string,
    imgUrl: PropTypes.string,
    description: PropTypes.string,
  })
};
