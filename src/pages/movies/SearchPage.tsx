import { Suspense } from "react";
import { useLoaderData, Await, redirect } from "react-router-dom";
import QueryResponse from "../../types/queryresponse";
import MovieList from "../../components/UI/MovieList";

const Search: React.FC = () => {
  const { results } = useLoaderData();
  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
      <Await resolve={results}>
        {(foundResults: QueryResponse) => (
          <>
            <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
                {foundResults.response.results.length === 0 ?
                  `No results found for ${foundResults.query}` :
                  `Showing results for ${foundResults.query}` 
                }
              </h2>
            </section>
            
            {foundResults.response.results.length > 0 && <MovieList response={foundResults.response} />}
          </>
        )}
      </Await>
    </Suspense>
  )
}

export default Search

export const action = async ({ request }) => {
  const data = await request.formData();
  const searchTerm = data.get('search')
  if (searchTerm === undefined || searchTerm.trim() === '') {
    return redirect('/')
  }
  
  return redirect(`/movies/search?query=${encodeURIComponent(searchTerm)}`)
}

const loadMovieResults = async({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  const response = await fetch(`${import.meta.env.VITE_TMDB_BASE_URL}/search/movie?query=${query}`,{
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
    },
  });

  if (response.ok || response.status === 404) {
    const resData = await response.json()
    // return { response: resData, query, error : response.status === 404 ? resData : {}}
    return response.status === 404 ? { response: null, query, error : resData } : { response: resData, query, error : null }
  } else {
    const body = { message: 'Could not fetch movies' }
    const myOptions = { status: 500, statusText: "Something failed" };
    // throw new Response(JSON.stringify(body), myOptions)
    return { response: Response.json(body, myOptions), query}
  }
}

export const loader = async ({ request }) => {
  return {
    results : loadMovieResults({ request })
  }
}