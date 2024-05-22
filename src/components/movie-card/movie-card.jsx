import PropTypes from "prop-types"

export const MovieCard = (props) => {
  return (
    <div
      onClick={() => {
        props.onMovieClick(props.movieData);
      }}
    >
      {props.movieData.title}
    </div>
  );

};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}