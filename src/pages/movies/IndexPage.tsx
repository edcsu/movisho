import { Await, useLoaderData } from "react-router";
import MovieList from "../../components/UI/MovieList";
import { Suspense } from "react";
import MovieResponse from "../../types/movieresponse";
import MovieListLoader from "../../components/UI/MovieListLoader";
import { useTitle } from "../../hooks/useTitle";
import type { LoaderFunction } from "react-router";

const MoviesPage = () => {
  const { results } = useLoaderData();
  useTitle('Home')
  
  return (
    <section>
      <Suspense fallback={<MovieListLoader />}>
        <Await resolve={results}>
          {(foundResults: MovieResponse) => <MovieList response={foundResults} />}
        </Await>
      </Suspense>
    </section>
  )
}

export default MoviesPage

const loadMovieResults = async({ request } : { request : Request }) => {
  const url = new URL(request.url);
  console.log(url)
  const page = url.searchParams.get("page") || 1;
  const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/movie/now_playing?language=en-US&page=${page}`,{
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

export const loader: LoaderFunction = async ({ request }) => {
  return {
    results : loadMovieResults({ request })
  }
}