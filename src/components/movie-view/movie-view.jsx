import PropTypes from "prop-types";

export const MovieView = (props) => {
  return (
    <div>
      <div>Title: {props.movieData.title}</div>
      <div>Director: {props.movieData.director}</div>
      <div>Genre: {props.movieData.genre}</div>
      <img src={props.movieData.imgUrl} className="movieImage" />
      <div>Description: {props.movieData.description}</div>
      <button onClick={props.onBackButton}>Go Back</button>
    </div>
  );
};

MovieView.PropTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string,
    genre: PropTypes.string,
    img: PropTypes.string,
    description: PropTypes.string,
  }),
  onBackButton: PropTypes.func.isRequired,
};
