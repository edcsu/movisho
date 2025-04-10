import { createBrowserRouter } from "react-router";
import MovieDetails, { loader as movieDetailsLoader } from "../pages/movies/MovieDetailsPage";
import RootLayout from "../layout/RootLayout";
import MoviesPage, { loader as moviesNowLoader } from "../pages/movies/IndexPage";
import Search, { loader as searchMovieLoader, action as searchMovieAction } from "../pages/movies/SearchPage";
import ErrorPage from "../pages/ErrorPage";
import TopRatedPage, { loader as topRatedLoader } from "../pages/movies/TopRatedPage";
import PopularPage, { loader as popularMoviesLoader } from "../pages/movies/PopularPage";
import UpcomingPage, { loader as upcomingLoader } from "../pages/movies/Upcoming";

const router = createBrowserRouter([
    {
        path: '',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index : true,
                element : <MoviesPage />,
                loader: moviesNowLoader
            },
            {
                path : 'movies',
                children: [
                    {
                        index : true,
                        element : <MoviesPage />,
                        // loader: MoviesNowLoader
                    },
                    {
                        path: 'popular',
                        element : <PopularPage />,
                        loader: popularMoviesLoader
                    },
                    {
                        path: 'top',
                        element : <TopRatedPage />,
                        loader: topRatedLoader
                    },
                    {
                        path: 'upcoming',
                        element : <UpcomingPage />,
                        loader: upcomingLoader
                    },
                    {
                        path:  ':id',
                        element: <MovieDetails />,
                        loader: movieDetailsLoader
                    },
                    {
                        path:  'search',
                        element: <Search />,
                        action: searchMovieAction,
                        loader: searchMovieLoader
                    },
                ]
            }
        ]
    }
])

export default router