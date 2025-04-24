import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import UpcomingPage from '../movies/Upcoming';
import { useLoaderData } from 'react-router';
import MovieResponse from '../../types/movieresponse';

// Mock dependencies
vi.mock('react-router', () => ({
    useLoaderData: vi.fn(),
    useNavigate: () => vi.fn(),
    NavLink: () => null,
    Await: ({ children, resolve }: { children: (data: MovieResponse) => React.ReactNode, resolve: MovieResponse }) => children(resolve)
}));

vi.mock('../../hooks/useTitle', () => ({
    useTitle: vi.fn()
}));

vi.mock('../../components/UI/MovieList', () => ({
    default: () => <div data-testid="movie-list">Movie List</div>
}));

vi.mock('../../components/UI/MovieListLoader', () => ({
    default: () => <div data-testid="movie-list-loader">Loading...</div>
}));

describe('UpcomingPage', () => {
    beforeEach(() => {
        vi.mocked(useLoaderData).mockReturnValue({ results: {} });
    });

    it('renders loading state initially', () => {
        render(<UpcomingPage />);
        expect(screen.getByTestId('movie-list')).toBeInTheDocument();
    });

    it('renders MovieList when data is loaded', async () => {
        render(<UpcomingPage />);
        expect(await screen.findByTestId('movie-list')).toBeInTheDocument();
    });
});