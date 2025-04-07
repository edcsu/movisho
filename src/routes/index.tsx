import { createBrowserRouter } from "react-router";
import MovieDetails from "../pages/movies/MovieDetailsPage";
import RootLayout from "../layout/RootLayout";
import MoviesPage from "../pages/movies/IndexPage";
import Search from "../pages/movies/SearchPage";
import ErrorPage from "../pages/ErrorPage";
import TopRatedPage from "../pages/movies/TopRatedPage";
import PopularPage from "../pages/movies/PopularPage";
import UpcomingPage from "../pages/movies/Upcoming";

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
                        element : <PopularPage />
                    },
                    {
                        path: 'top',
                        element : <TopRatedPage />
                    },
                    {
                        path: 'upcoming',
                        element : <UpcomingPage />
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