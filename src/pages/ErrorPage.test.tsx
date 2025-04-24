import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import ErrorPage from './ErrorPage'
import { useLocation, useRouteError } from 'react-router'

vi.mock('react-router', () => ({
    useRouteError: vi.fn(),
    useLocation: vi.fn(() => ({
        pathname: '',
        search: '',
        hash: '',
        state: null,
        key: 'default'
    })),
    NavLink: vi.fn(({ children }) => children),
    Form: vi.fn(({ children }) => children)
}))
window.scrollTo = vi.fn()
window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
}))

describe('ErrorPage', () => {
    it('renders 404 error page correctly', () => {
        vi.mocked(useRouteError).mockReturnValue({
            status: 404,
            data: ''
        })
        vi.mocked(useLocation).mockReturnValue({
            pathname: '/some-path',
            search: '',
            hash: '',
            state: null,
            key: 'default'
        })

        render(<ErrorPage />)
        
        expect(screen.getByText('Not found')).toBeInTheDocument()
        expect(screen.getByText('Could not find resource or page')).toBeInTheDocument()
        expect(screen.getByAltText('Could not find resource or page')).toBeInTheDocument()
    })

    it('renders 500 error page correctly', () => {
        vi.mocked(useRouteError).mockReturnValue({
            status: 500,
            data: JSON.stringify({ message: 'Server error occurred' })
        })

        render(<ErrorPage />)
        console.log(screen.debug())
        expect(screen.getByText('An error occured!')).toBeInTheDocument()
        expect(screen.getByText('Server error occurred')).toBeInTheDocument()
        expect(screen.getByAltText('Server error occurred')).toBeInTheDocument()
    })

    it('renders default error page for unknown error', () => {
        vi.mocked(useRouteError).mockReturnValue({
            status: 400,
            data: ''
        })

        render(<ErrorPage />)
        
        expect(screen.getByText('An error occured!')).toBeInTheDocument()
        expect(screen.getByText('Something went wrong')).toBeInTheDocument()
        expect(screen.getByAltText('Something went wrong')).toBeInTheDocument()
    })
})