import { NavLink } from "react-router-dom"
import { Result } from "../../types/movieresponse";

type Props = {
  movie: Result
};

const MovieCard: React.FC<Props> = ({ movie } : Props)  => {
  const moviePic = `${import.meta.env.VITE_TMDB_IMAGE_URL}/${movie.poster_path}`
  return (
    <article className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm transition hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <NavLink to={`movies/${movie.id}`}>
        <figure>
          <img
            src={moviePic}
            alt={movie.title} 
          />
        </figure>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h2>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
        </div>
      </NavLink>
    </article>
  )
}

export default MovieCard