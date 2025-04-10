import { useNavigate } from "react-router";
import MoviePagination from "../../types/moviepagination";
import MovieResponse from "../../types/movieresponse";
import AppPagination from "./AppPagination";
import MovieCard from "./MovieCard"

type Props = {
  response: MovieResponse
};

const MovieList: React.FC<Props> = ({ response } : Props) => {
  const navigate = useNavigate();
  const { results, page, total_pages } = response
  const pagination: MoviePagination  = {
    page,
    total_pages,
    onPageChange : (page: number) => {
      navigate(`/?page=${page}`)
    },
    maxVisiblePages : 8,
  }
  return (
    <>
      <div className="py-8 px-8 grid justify-items-center grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {results.map( movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <AppPagination pagination={pagination} />
    </>
  )
}

export default MovieList