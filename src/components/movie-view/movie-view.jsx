import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

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
        <Card.Img src={movieData.imgUrl} className="movieImage" />
        <Card.Body>
          <Card.Title>Title: {movieData.title}</Card.Title>
          <Card.Text>
            <div>Description: {movieData.description}</div>
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
            <h2>Movies in the Genre</h2>
            {similarMoviesGenre.map((movie) => (
              <MovieCard
                key={movie.id}
                movieData={movie}
                onMovieClick={onMovieClick}
              />
            ))}
            <h2>Movies from the Director</h2>
            {similarMoviesDirector.map((movie) => (
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={onMovieClick}
              />
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
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
