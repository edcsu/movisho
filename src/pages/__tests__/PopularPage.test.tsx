import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PopularPage from '../movies/PopularPage';
import { useLoaderData } from 'react-router';
import MovieResponse from '../../types/movieresponse';

vi.mock('react-router', () => ({
    useLoaderData: vi.fn(),
    useNavigate: () => vi.fn(),
    NavLink: () => null,
    Await: ({ children, resolve }: { children: (data: MovieResponse) => React.ReactNode, resolve: MovieResponse }) => children(resolve)
}));

vi.mock('../../hooks/useTitle', () => ({
    useTitle: vi.fn()
}));

describe('PopularPage', () => {
    it('should render movie list with loader data', () => {
        const mockResults = {
            results: [
                { id: 1, title: 'Movie 1' },
                { id: 2, title: 'Movie 2' }
            ],
            total_pages: 1,
            total_results: 2
        };

        vi.mocked(useLoaderData).mockReturnValue({ 
            results: mockResults 
        });

        render(<PopularPage />);
        
        expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should handle empty results', () => {
        const mockEmptyResults = {
            results: [],
            total_pages: 0,
            total_results: 0
        };

        vi.mocked(useLoaderData).mockReturnValue({ 
            results: mockEmptyResults 
        });

        render(<PopularPage />);
        
        expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
});