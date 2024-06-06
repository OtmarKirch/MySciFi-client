import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = (props) => {
  // Shorten the description of the movie to 100 characters
  const shortDescription =
    props.movieData.description.substring(0, 100) + "...";
  const altTextImage = "Movie poster of " + props.movieData.title;
  const selectedMovieUrl = "/movies/" + encodeURIComponent(props.movieData.id);

  // Return a card with the movie data
  return (
    <>
      <Card className="h-100">
        <Card.Img
          alt={altTextImage}
          variant="top"
          src={props.movieData.imgUrl}
        />
        <Card.Body>
          <Card.Title>{props.movieData.title}</Card.Title>
          {props.noDescription === false || props.noDescription === undefined ?  (
            <Card.Text>{shortDescription}</Card.Text>
          ) : null}
        </Card.Body>
        <Link to={selectedMovieUrl}>
          <Button variant="link">Go to movie</Button>
        </Link>
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  noDescription: PropTypes.bool,
};
