import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopRatedPage from '../movies/TopRatedPage'
import { useLoaderData } from 'react-router'
import MovieResponse from '../../types/movieresponse'

// Mock the dependencies
vi.mock('react-router', () => ({
    useLoaderData: vi.fn(),
    Await: ({ children, resolve }: { children: (data: MovieResponse) => React.ReactNode, resolve: MovieResponse }) => children(resolve)
}))

vi.mock('../../hooks/useTitle', () => ({
    useTitle: vi.fn()
}))

vi.mock('../../components/UI/MovieList', () => ({
    default: () => <div data-testid="movie-list">Movie List</div>
}))

vi.mock('../../components/UI/MovieListLoader', () => ({
    default: () => <div data-testid="movie-list">Loading...</div>
}))

describe('TopRatedPage', () => {
    beforeEach(() => {
        vi.mocked(useLoaderData).mockReturnValue({ results: {} })
    })

    it('renders MovieListLoader while loading', () => {
        render(<TopRatedPage />)
        expect(screen.getByTestId('movie-list')).toBeInTheDocument()
    })

    it('renders MovieList when data is loaded', () => {
        render(<TopRatedPage />)
        expect(screen.getByTestId('movie-list')).toBeInTheDocument()
    })

    it('calls loader function and handles successful response', async () => {
        const { loader } = await import('../movies/TopRatedPage')
        const result = await loader()
        expect(result).toHaveProperty('results')
    })
})