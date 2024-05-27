import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = (props) => {
  const shortDescription =
    props.movieData.description.substring(0, 100) + "...";
  const altTextImage = "Movie poster of " + props.movieData.title
  return (
    <>
        <Card className="h-100"
        onClick={() => {
          props.onMovieClick(props.movieData);
        }}
      >
        <Card.Img alt={altTextImage} variant="top" src={props.movieData.imgUrl}/>
        <Card.Body>
          <Card.Title>{props.movieData.title}</Card.Title>
          <Card.Text>{shortDescription}</Card.Text>
          </Card.Body>
        <Button variant="link"
        onClick={() => {
          props.onMovieClick(props.movieData);
        }}>Go to movie</Button>
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
