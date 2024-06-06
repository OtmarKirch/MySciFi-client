import PropTypes from "prop-types";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ user, updateUserData, moviesData, token }) => {
  // Get the movieId from the URL and find the movie data
  const { movieId } = useParams();
  const movieData = moviesData.find((movie) => {
    return movie.id === movieId;
  });

  // Handle the favorite movie buttons add and delete
  const handleFavoriteMovie = (event, addDelete) => {
    event.preventDefault();
    const requestData = { favoriteMovie: movieData.title };
    let requestMethod = addDelete === "add" ? "POST" : "DELETE";

    // Send a request to the server to add or delete the selected movie from the favorite movies of the user
    const dbUrl = "https://quiet-bastion-19832-9b36523e0b42.herokuapp.com/users/favoritemovie"
    fetch(dbUrl, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          updateUserData(data);
        }
        console.log("Success:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const altTextImage = "Movie poster of " + movieData.title;
  // Find the movies with the same genre and director
  const similarMoviesGenre = moviesData.filter((movie) => {
    return movie.genre === movieData.genre && movie.title != movieData.title;
  });
  const similarMoviesDirector = moviesData.filter((movie) => {
    return (
      movie.director === movieData.director && movie.title != movieData.title
    );
  });

  let alreadyAdded = ((favoriteMovie)=>{
    if(favoriteMovie.includes(movieData.id)){return true}else{return false}
  })(user.favoriteMovies)

  // Return a view of the movie with movies of the same genre and director under it
  return (
    <div>
      <Row>
        <Card className="h-100 p-0">
          <Card.Img
            alt={altTextImage}
            src={movieData.imgUrl}
            variant="top"
          />
          <Card.Body>
            <Card.Title>{movieData.title}</Card.Title>
            <Card.Text>
              <div>{movieData.description}</div>
              <div>Director: {movieData.director}</div>
              <div>Genre: {movieData.genre}</div>
              <Link to="/">
                <Button variant="link">Go back</Button>
              </Link>
              <br />
              <Button
                disabled={alreadyAdded}
                variant="primary"
                onClick={(e) => {
                  handleFavoriteMovie(e, "add");
                }}
              >
                Add to favorite movies
              </Button>
              <br/>
              <Button
                disabled={!alreadyAdded}
                variant="primary"
                className="mt-2"
                onClick={(e) => {
                  handleFavoriteMovie(e, "delete");
                }}
              >
                Delete from favorite movies
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <h2 className="mt-3">The Genre</h2>
      {movieData.genreText}
      <h3 className="mt-3">More movies in the Genre</h3>
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
      <h2 className="mt-3">The Director</h2>
      {movieData.directorText}
      <h3 className="mt-3">More movies from the Director</h3>
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

// The propTypes for the MovieView component
MovieView.propTypes = {
  user: PropTypes.object,
  updateUserData: PropTypes.func,
  moviesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  token: PropTypes.string,
};