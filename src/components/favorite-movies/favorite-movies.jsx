import { MovieCard } from "../movie-card/movie-card";
import { Col } from "react-bootstrap";

export const FavoriteMovies = ({
  userData,
  moviesData,
  updateUserData,
  token,
}) => {
  const favoriteMovies = [];

  userData.favoriteMovies.forEach((movieId) => {
    const favoriteMovie = moviesData.find((movie) => {
      return movie.id === movieId;
    });
    if(favoriteMovie){
    favoriteMovies.push(favoriteMovie);}
  });

  return (
    <>
      {favoriteMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
          <MovieCard userData={userData} key={movie.id} movieData={movie} />
        </Col>
      ))}
      {/* {user.favoriteMovies.map = (movie)=>{
            <MovieCard
             />
        }} */}
    </>
  );
};
