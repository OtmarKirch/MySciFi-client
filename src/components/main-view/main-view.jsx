import React from "react";
import { useState } from "react";
import {MovieCard} from "../movie-card/movie-card"
import {MovieView} from "../movie-view/movie-view"

export const MainView = () => {
    const [movies, setMovies] = useState([{id: 1, title: "First Movie"}, {id: 2, title: "Second Movie"}])
    
    const [selectedMovie, setSelectedMovie] = useState(null)

    if (selectedMovie){
        console.log("test")
        return (<MovieView 
                    movieData = {selectedMovie}
                    onBackButton = {()=>{setSelectedMovie(null)}}
        />)
    }
    if (movies.length === 0){
        return <div>Movie list is empty!</div>
    }

    return(
        <div>
      {movies.map((movie) => {
        return (<MovieCard 
                    key = {movie.id}
                    movieData = {movie}
                    onMovieClick = {(newSelectedMovie)=>{
                        setSelectedMovie(newSelectedMovie)
                    }}
        />);
      })}
    </div>
    )
    
}