import MovieDetailResponse from "../../types/moviedetail";
import FamilyLogo from "../../assets/family.svg"
import EighteenLogo from "../../assets/rated.svg"
import MoviePoster from "../../assets/movieposter.jpeg"

import { formatPriceToDollar } from "../../utils/converters";
import { Suspense } from "react";
import ImageLoader from "./ImageLoader";
import { motion } from "motion/react"

type Props = {
  movie: MovieDetailResponse
};

const MovieDetail: React.FC<Props> = ({ movie } : Props) => {
  let moviePic = `${import.meta.env.VITE_TMDB_IMAGE_URL}/${movie.poster_path}`
  const movieDate = new Date(movie.release_date).toLocaleDateString('en-us', {
    day : 'numeric',
    month : 'long',
    year : 'numeric'
  })
  const movieBudget = formatPriceToDollar(movie.budget)
  const movieRevenue = formatPriceToDollar(movie.revenue)
  if (movie.poster_path === null || movie.poster_path === undefined || movie.poster_path.trim() === "") {
    moviePic = MoviePoster
  }

  let movieStatus = (
    <span className="font-semibold text-emerald-500 dark:text-emerald-400">{movie.status}</span>
  )

  if (movie.status.toLowerCase() !== 'released') {
    movieStatus = (
      <span className="font-semibold text-yellow-400 dark:text-yellow-300">{movie.status}</span>
    )
  }

  let movieVoteAverage = (
    <span className="text-emerald-500 dark:text-emerald-400">{movie.vote_average}</span>
  )

  if (movie.vote_average <= 3) {
    movieVoteAverage = (
      <span className="text-red-500 dark:text-red-400">
        {movie.vote_average}
      </span>)
  } else if (movie.vote_average >= 4 && movie.vote_average <= 8) {
    movieVoteAverage = (
      <span className="text-slate-500 dark:text-slate-300">
        {movie.vote_average}
      </span>
    )
  }

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.3,
            scale: { type: "spring", visualDuration: 0.3, bounce: 0.25 },
        }} 
        className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8 justify-items-center">
          <div>
            <Suspense fallback={<ImageLoader />}>
              <figure>
                <img
                  className="rounded-tr-3xl rounded-bl-3xl"
                  src={moviePic}
                  alt={movie.title} 
                />
              </figure>
            </Suspense>
          </div>
          <div>
          <div className="max-w-lg md:max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">
              {movie.title}
            </h2>

            <p className="mt-4 text-gray-700 dark:text-white">
              {movie.overview}
            </p>
            <p className="my-3">
              {movie.genres.map(genre => (
                <span key={genre.id} className="px-3 py-2 mr-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
                  {genre.name}
                </span>
              ))}
            </p>
            <div className="flow-root my-4">
              <dl
                className="-my-3 divide-y divide-gray-200 text-sm *:even:bg-gray-50 dark:divide-gray-700 dark:*:even:bg-gray-800"
              >
                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Rating</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                    {movieVoteAverage}/10 ({movie.vote_count} votes)
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Release date</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{movieDate}</dd>
                </div>
                
                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Runtime</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{movie.runtime} minutes</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Budget</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                    {movie.budget === 0 ? "Not available" : movieBudget}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Revenue</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                    {movie.revenue === 0 ? "Not available" : movieRevenue}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Tagline</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                    {movie.tagline.trim() === "" ? "Not available": movie.tagline}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">IMDB code</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                    {movie.imdb_id}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Status</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                    {movieStatus}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">
                    Movie audience
                  </dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                    {movie.adult ? 
                    (<img src={EighteenLogo} alt="rated movie" />) :
                    (<img src={FamilyLogo} alt="not rated movie" width={150} />)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default MovieDetail