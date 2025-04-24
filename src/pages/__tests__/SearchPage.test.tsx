import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Search from '../movies/SearchPage';
import { useLoaderData, useSearchParams } from 'react-router';
import MovieResponse from '../../types/movieresponse';

vi.mock('react-router', () => ({
    useLoaderData: vi.fn(),
    useSearchParams: vi.fn(),
    useNavigate: () => vi.fn(),
    NavLink: () => null,
    Await: ({ children, resolve }: { children: (data: MovieResponse) => React.ReactNode, resolve: MovieResponse }) => children(resolve)
}));

vi.mock('../../hooks/useTitle', () => ({
    useTitle: vi.fn()
}));

describe('Search Page', () => {
    test('renders search results when data is loaded', () => {
        const mockResults = {
            query: 'test',
            response: {
                results: [
                    { id: 1, title: 'Test Movie' }
                ]
            }
        };

        vi.mocked(useLoaderData).mockReturnValue({ results: mockResults });
        vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams({ query: 'test' }), vi.fn()]);

        render(<Search />);

        expect(screen.getByText('Showing results for test')).toBeInTheDocument();
    });

    test('shows no results message when no movies found', () => {
        const mockResults = {
            query: 'nonexistent',
            response: {
                results: []
            }
        };

        vi.mocked(useLoaderData).mockReturnValue({ results: mockResults });
        vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams({ query: 'nonexistent' }), vi.fn()]);

        render(<Search />);

        expect(screen.getByText('No results found for nonexistent')).toBeInTheDocument();
    });
});