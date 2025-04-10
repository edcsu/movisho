import { NavLink } from "react-router"
import { Result } from "../../types/movieresponse";
import MoviePoster from "../../assets/movieposter.jpeg"
import { Suspense } from "react";
import ImageLoader from "./ImageLoader";
import { motion } from "motion/react"

type Props = {
  movie: Result
};

const MovieCard: React.FC<Props> = ({ movie } : Props) => {
  let moviePic = `${import.meta.env.VITE_TMDB_IMAGE_URL}/${movie.poster_path}`
  if (movie.poster_path === null || movie.poster_path === undefined || movie.poster_path.trim() === "") {
    moviePic = MoviePoster
  }
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm transition hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
      <NavLink to={`/movies/${movie.id}`}>
        <figure>
          <Suspense fallback={<ImageLoader />}>
            <img
              src={moviePic}
              alt={movie.title} 
            />
          </Suspense>
        </figure>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.title}</h2>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.overview}</p>
        </div>
      </NavLink>
    </motion.article>
  )
}

export default MovieCard