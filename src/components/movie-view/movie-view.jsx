import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Row } from "react-bootstrap"

export const MovieView = ({
  movieData,
  movies,
  onMovieClick,
  onBackButton,
}) => {
  const similarMoviesGenre = movies.filter((movie) => {
    return movie.genre === movieData.genre && movie.title != movieData.title;
  });
  const similarMoviesDirector = movies.filter((movie) => {
    return (
      movie.director === movieData.director && movie.title != movieData.title
    );
  });
  return (
    <div>
      <Card>
        <Card.Img src={movieData.imgUrl} className="w-100" />
        <Card.Body>
          <Card.Title>{movieData.title}</Card.Title>
          <Card.Text>
            <div>{movieData.description}</div>
            <div>Director: {movieData.director}</div>
            <div>Genre: {movieData.genre}</div>
        <Button
          variant="link"
          onClick={() => {
            onBackButton();
          }}
        >
          Go back
        </Button>
          </Card.Text>
        </Card.Body>
      </Card>
            <h2>Movies in the Genre</h2>
            <Row>
            {similarMoviesGenre.map((movie) => (
              <>
              <Col  className="mb-4" md={3}>
              <MovieCard
                key={movie.id}
                movieData={movie}
                onMovieClick={onMovieClick}
              /></Col></>
            ))}
            </Row>
            <h2>Movies from the Director</h2>
            <Row>
            {similarMoviesDirector.map((movie) => (
              <>
              <Col  className="mb-4" md={3}>
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={onMovieClick}
              />
              </Col></>
            ))}
            </Row>
    </div>
  );
};

MovieView.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string,
    genre: PropTypes.string,
    img: PropTypes.string,
    description: PropTypes.string,
  }),
  onBackButton: PropTypes.func.isRequired,
};
