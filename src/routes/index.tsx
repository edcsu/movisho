import { createBrowserRouter } from "react-router";
import MovieDetails from "../pages/movies/MovieDetailsPage";
import RootLayout from "../layout/RootLayout";
import MoviesPage from "../pages/movies/IndexPage";
import Search from "../pages/movies/SearchPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: '',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index : true,
                element : <MoviesPage />
            },
            {
                path : 'movies',
                children: [
                    {
                        index : true,
                        element : <MoviesPage />
                    },
                    {
                        path: 'popular',
                        element : <MoviesPage />
                    },
                    {
                        path: 'top',
                        element : <MoviesPage />
                    },
                    {
                        path: 'upcoming',
                        element : <MoviesPage />
                    },
                    {
                        path:  ':id',
                        element: <MovieDetails />
                    },
                    {
                        path:  'search',
                        id: 'movie-detail',
                        element: <Search />
                    },
                ]
            }
        ]
    }
])

export default router