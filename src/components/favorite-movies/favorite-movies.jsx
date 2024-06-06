import { MovieCard } from "../movie-card/movie-card";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";

export const FavoriteMovies = ({
  userData,
  moviesData
}) => {
  // Filter the moviesData array to only include the movies that are in the favoriteMovies array
  const favoriteMovies = [];
  userData.favoriteMovies.forEach((movieId) => {
    const favoriteMovie = moviesData.find((movie) => {
      return movie.id === movieId;
    });
    if(favoriteMovie){
    favoriteMovies.push(favoriteMovie);}
  });

  // Map over the favoriteMovies array and render a MovieCard component for each movie
  return (
    <>
      {favoriteMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
          <MovieCard userData={userData} key={movie.id} movieData={movie} />
        </Col>
      ))}
    </>
  );
};

// The propTypes for the FavoriteMovies component
FavoriteMovies.propTypes = {
  userData: PropTypes.shape({
    favoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
  moviesData: PropTypes.array.isRequired,
};