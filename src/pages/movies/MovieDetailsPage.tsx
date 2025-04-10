import { Suspense, useEffect } from "react"
import { Await, useLoaderData, useParams } from "react-router"
import MovieDetailResponse from "../../types/moviedetail"
import MovieDetail from "../../components/UI/MovieDetail"
import MovieDetailLoader from "../../components/UI/MovieDetailLoader"
import type { Params } from "react-router";

const MovieDetails = () => {
  const { result } = useLoaderData()
  const params = useParams() 
  useEffect(() => {
    document.title = `Movisho: ${params.id}`
  }, [params.id])

  return (
    <Suspense fallback={<MovieDetailLoader />}>
      <Await resolve={result}>
        {(movie: MovieDetailResponse) => <MovieDetail movie={movie} />}
      </Await>
    </Suspense>
  )
}

export default MovieDetails

const loadMovieResult = async({ params }: { params: Params<"id"> }) => {
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

export const loader = async ({ params }: { params: Params<"id"> }) => {
  return {
    result : loadMovieResult({ params })
  }
}