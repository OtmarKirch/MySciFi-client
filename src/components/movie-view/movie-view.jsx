export const MovieView = (props) => {
    console.log(props.movieData)
    return (
        <div>
        <div>{props.movieData.title}</div>
        <button onClick={props.onBackButton}>Go Back</button>
        </div>
    )
}