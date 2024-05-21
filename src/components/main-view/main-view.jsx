import React from "react";
import { useState } from "react";
import {MovieCard} from "../movie-card/movie-card"
import {MovieView} from "../movie-view/movie-view"

export const MainView = () => {
    const [movies, setMovies] = useState([{id: 1, title: "First Movie"}, {id: 2, title: "Second Movie"}])
    const movie = movies[1]
    return <MovieCard movieData={movie}/>
    return(
        
        <div>
            {movies.map((movie) => (
                 <MovieCard
                    key={movie.id} 
                    movieData={movie}
                />
            ))}
        </div>
    )
    
}