import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap"

export const MovieView = (props) => {
  return (
    <div>
      <Card>
        <Card.Img src={props.movieData.imgUrl} className="movieImage"/>
        <Card.Body>
          <Card.Title>Title: {props.movieData.title}</Card.Title>
          <Card.Text>
            <div>Description: {props.movieData.description}</div>
            <div>Director: {props.movieData.director}</div>
            <div>Genre: {props.movieData.genre}</div>
          </Card.Text>
        </Card.Body>
        <Button
        variant="link"
        onClick={()=>{
          props.onBackButton()
        }}
        >Go back</Button>
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
