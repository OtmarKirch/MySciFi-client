export const MovieCard = (props) => {
    console.log(props.movieData)
    return (
        <div onClick={()=>{
            props.onMovieClick(props.movieData)
        }}>
            
        {props.movieData.title}
        </div>
    
)
} 