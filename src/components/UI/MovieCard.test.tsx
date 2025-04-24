import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';
import { BrowserRouter } from 'react-router';

describe('MovieCard', () => {
    const mockMovie = {
        id: 1,
        title: 'Test Movie',
        overview: 'Test Overview',
        poster_path: '/test-path.jpg',
        backdrop_path: "/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
        adult: false,
        genre_ids: [
            28,
            80,
            53
        ],
        original_language: "en",
        original_title: "A Working Man",
        popularity: 942.1209,
        release_date: "2025-03-26",
        video: false,
        vote_average: 6.314,
        vote_count: 409
    };

    it('renders movie card with correct data', () => {
        render(
            <BrowserRouter>
                <MovieCard movie={mockMovie} />
            </BrowserRouter>
        );
        
        expect(screen.getByText('Test Movie')).toBeInTheDocument();
        expect(screen.getByText('Test Overview')).toBeInTheDocument();
        expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
    });

    it('uses fallback image when poster_path is null', () => {
        const movieWithoutPoster = { ...mockMovie, poster_path: "" };
        render(
            <BrowserRouter>
                <MovieCard movie={movieWithoutPoster} />
            </BrowserRouter>
        );
        
        const img = screen.getByAltText('Test Movie');
        expect(img).toHaveAttribute('src', expect.stringContaining('movieposter.jpeg'));
    });
});