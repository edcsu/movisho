import { Suspense } from "react";
import { useLoaderData, Await } from "react-router";
import MovieList from "../../components/UI/MovieList";
import MovieResponse from "../../types/movieresponse";
import MovieListLoader from "../../components/UI/MovieListLoader";
import { useTitle } from "../../hooks/useTitle";

const UpcomingPage = () => {
  const { results } = useLoaderData();
  useTitle('Upcoming')

  return (
    <Suspense fallback={<MovieListLoader/>}>
      <Await resolve={results}>
        {(foundResults: MovieResponse) => <MovieList response={foundResults} />}
      </Await>
    </Suspense>
  )
}

export default UpcomingPage

const loadMovieResults = async() => {
  const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,{
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

export const loader = async () => {
  return {
    results : loadMovieResults()
  }
}