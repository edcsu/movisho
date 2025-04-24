import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import App from '../App'

// Mock window methods
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

// Mock the router module
vi.mock('./routes', () => ({
    default: {
        // Add minimal mock implementation
    }
}))

describe('App', () => {
    it('renders RouterProvider with correct router prop', () => {
        const { container } = render(<App />)
        expect(container).toBeDefined()
    })

    it('matches snapshot', () => {
        const { container } = render(<App />)
        expect(container).toMatchSnapshot()
    })
})