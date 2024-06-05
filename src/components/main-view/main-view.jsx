import { useState, useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UserProfile } from "../user-profile/user-profile";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FavoriteMovies } from "../favorite-movies/favorite-movies";

//TODO remake navigation bar
//TODO search feature for movies in the main view

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("genre");

  useEffect(() => {
    if (!token) {
      return;
    }
    const dbUrl = "https://quiet-bastion-19832-9b36523e0b42.herokuapp.com/movies"
    fetch(dbUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movieData) => {
        const movieList = movieData.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            director: doc.director.name,
            directorText: doc.director.description,
            genre: doc.genre.name,
            genreText: doc.genre.description,
            imgUrl: doc.imgUrl,
            description: doc.description,
          };
        });
        let sortedMovies=[];
        if(sortBy){
          switch(sortBy){
            case "title":
              let titles = movieList.map((movie)=>movie.title);
              titles.sort();
              titles.forEach((title)=>{
                movieList.forEach((movie)=>{
                  if(movie.title === title){
                    sortedMovies.push(movie);
                  }
                })
              })
              setMovies(sortedMovies);
              break;
            case "director":
              let directors = movieList.map((movie)=>movie.director);
              let directorsSet = new Set(directors);
              let directorsArray = Array.from(directorsSet).sort();
              directorsArray.forEach((director)=>{
                movieList.forEach((movie)=>{
                  if(movie.director === director){
                    sortedMovies.push(movie);
                  }
                })
              })
              setMovies(sortedMovies);
              break;
            case "genre":
              let genres = movieList.map((movie)=>movie.genre);
              let genresSet = new Set(genres);
              let genresArray = Array.from(genresSet).sort();
              console.log(genresArray);
              genresArray.forEach((genre)=>{
                movieList.forEach((movie)=>{
                  if(movie.genre === genre){
                    sortedMovies.push(movie);
                  }
                })
              })
              setMovies(sortedMovies);
              break;
            default:
              setMovies(movieList);
          }
        }else{setMovies(movieList);}
        
        
      })
      .catch((error) => console.error("Error:", error));
  }, [token, sortBy]);

  return (
    <BrowserRouter>
    <NavigationBar 
      user={user}
      onLoggedOut={()=>{
        setUser(null)
        setToken(null)
        localStorage.clear()
      }}
    />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (<Navigate to="/" />):(
                  <Col md={5}>
                    <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <SignupView />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
              ): movies.length === 0 ? (
              <Col>The list ist empty!</Col>
            ):(
            <>
            <Col md={8}>
              <MovieView
              user={user}
              updateUserData={(userData)=>{setUser(userData)}}
              moviesData={movies}
              token={token} />
            </Col>
            </>)
          }
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
              {!user ? (
              <Navigate to="/login" replace />
              ):movies.length === 0 ? (<Col>List ist empty</Col>):(
                <>
                {movies.map((movie)=>(
                  <Col className="mb-4" key={movie.id} md={3}>
                  <MovieCard
                  userData={user} 
                  key={movie.id}
                  movieData={movie}
                   />
                  </Col>))}
                </>
              )}
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
              {!user ? (
                <Navigate to="/login" replace />
              ):(
                <UserProfile
                user={user}
                token={token}
                importNewUserData={(user)=>{setUser(user)}}
                onLoggedOut={()=>{
                  setUser(null)
                  setToken(null)
                  localStorage.clear()
                }} />
              )}
              </>
            }
          ></Route>
          <Route
          path="/favoriteMovies"
          element={
            <>
            {!user ? (
            <Navigate to="/login" replace />
            ):(
              <>
                  <FavoriteMovies
                  userData={user}
                  setUserData={setUser}
                  moviesData={movies}
                   />
              </>
            )}
            </>
          }
          >

          </Route>
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
