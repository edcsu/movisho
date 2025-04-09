import MovieDetailResponse from "../../types/moviedetail";

type Props = {
  movie: MovieDetailResponse
};

const MovieDetail: React.FC<Props> = ({ movie } : Props) => {
  const moviePic = `${import.meta.env.VITE_TMDB_IMAGE_URL}/${movie.poster_path}`
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <figure>
              <img
                className="rounded-tr-3xl rounded-bl-3xl"
                src={moviePic}
                alt={movie.title} 
              />
            </figure>
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
                  <dt className="font-medium text-gray-900 dark:text-white">Runtime</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{movie.runtime} minutes</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Budget</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{movie.budget}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Revenue</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{movie.revenue}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">Release date</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{movie.release_date}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 dark:text-white">IMDB code</dt>

                  <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                    {movie.imdb_id}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieDetail