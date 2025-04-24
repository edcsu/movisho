import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTitle } from '../../hooks/useTitle'
import MoviesPage from '../movies/IndexPage'

vi.mock('../../hooks/useTitle', () => ({
    useTitle: vi.fn()
}))

vi.mock('react-router', () => ({
    useLoaderData: () => ({ results: {} }),
    Await: ({ children }: { children: (data: unknown) => React.ReactNode }) => children({}),
}))

describe('MoviesPage', () => {
    it('should set page title to "Home"', () => {
        renderHook(() => MoviesPage())
        expect(useTitle).toHaveBeenCalledWith('Home')
    })
})