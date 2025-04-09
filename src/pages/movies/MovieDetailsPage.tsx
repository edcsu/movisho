import { Suspense } from "react"
import { Await, useLoaderData } from "react-router-dom"
import MovieDetailResponse from "../../types/moviedetail"
import MovieDetail from "../../components/UI/MovieDetail"

const MovieDetails = () => {
  const { result } = useLoaderData()

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
      <Await resolve={result}>
        {(movie: MovieDetailResponse) => <MovieDetail movie={movie} />}
      </Await>
    </Suspense>
  )
}

export default MovieDetails

const loadMovieResult = async({ request, params}) => {
  const id = params.id
  const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}`,{
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
    },
  });
  if (!response.ok) {
    const body = { message: 'Could not fetch movies' }
    const myOptions = { status: 500, statusText: "Something failed" };
    // throw new Response(JSON.stringify(body), myOptions)
    return Response.json(body, myOptions)
    
  } else {
    const resData = await response.json()
    return resData
  }
}

export const loader = async ({ request, params }) => {
  return {
    result : loadMovieResult({ request, params})
  }
}