import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import MovieDetails from '../movies/MovieDetailsPage'
import { useLoaderData, useParams } from 'react-router'
import { useTitle } from '../../hooks/useTitle'
import MovieDetailResponse from '../../types/moviedetail'

// Mock dependencies
vi.mock('react-router', () => ({
    useLoaderData: vi.fn(),
    useParams: vi.fn(),
    Await: ({ children, resolve }: { children: (data: MovieDetailResponse) => React.ReactNode, resolve: MovieDetailResponse }) => children(resolve)
}))

vi.mock('../../hooks/useTitle', () => ({
    useTitle: vi.fn()
}))

vi.mock('../../components/UI/MovieDetail', () => ({
    default: ({ movie }: { movie: MovieDetailResponse }) => <div data-testid="movie-detail">{movie.title}</div>
}))

describe('MovieDetails', () => {
    const mockMovie = {
        id: 1,
        title: 'Test Movie'
    }

    beforeEach(() => {
        vi.mocked(useLoaderData).mockReturnValue({ result: mockMovie })
        vi.mocked(useParams).mockReturnValue({ id: '1' })
    })

    it('renders movie detail component with correct data', () => {
        render(<MovieDetails />)
        expect(screen.getByTestId('movie-detail')).toHaveTextContent('Test Movie')
    })

    it('sets page title using movie id', () => {
        render(<MovieDetails />)
        expect(useTitle).toHaveBeenCalledWith('1')
    })
})