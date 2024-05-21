export const MovieView = (props) => {
    return (
        <div>
        <div>Title: {props.movieData.title}</div>
        <div>Director: {props.movieData.director.name}</div>
        <div>Genre: {props.movieData.genre.name}</div>
        <img src={props.movieData.imgUrl} className="movieImage"/>
        <div>Description: {props.movieData.description}</div>
        <button onClick={props.onBackButton}>Go Back</button>
        </div>
    )
}