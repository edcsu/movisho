import MovieResponse from "../../types/movieresponse";
import MovieCard from "./MovieCard"

type Props = {
  response: MovieResponse
};

const MovieList: React.FC<Props> = ({ response } : Props) => {
  const { results } = response
  return (
    <div className="py-8 px-8 grid justify-items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {results.map( movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList