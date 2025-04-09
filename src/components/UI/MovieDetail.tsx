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
              {movie.genres.map(genre => (
                <span key={genre.id} className="px-3 py-1 mr-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieDetail