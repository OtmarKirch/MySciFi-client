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
