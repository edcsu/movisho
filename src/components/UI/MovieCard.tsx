import { NavLink } from "react-router-dom"

const MovieCard = ({ movie}) => {
  const moviePic = `${import.meta.env.VITE_TMDB_IMAGE_URL}/${movie.poster_path}`
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <NavLink to={`movies/${movie.id}`}>
        <figure>
          <img
            src={moviePic}
            alt={movie.title} />
        </figure>
      </NavLink>
      <div className="card-body">
        <h2 className="card-title">{movie.title}</h2>
        <p>{movie.overview}</p>
        <div className="card-actions justify-end">
          <button type="button" className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard