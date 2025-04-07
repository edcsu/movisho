import MovieCard from "./MovieCard"

const MovieList = ({ response }) => {
  const { results } = response
  return (
    <>
      {results.map( movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </>
  )
}

export default MovieList