import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import RootLayout from './RootLayout'

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

describe('RootLayout', () => {
    it('renders header, main content area, and footer', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <RootLayout />
            }
        ])
        render(<RouterProvider router={router} />)


        expect(document.querySelector('header')).toBeInTheDocument()
        expect(document.querySelector('main')).toBeInTheDocument()
        expect(document.querySelector('footer')).toBeInTheDocument()
    })

    it('main content area has correct styling classes', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <RootLayout />
            }
        ])
        render(<RouterProvider router={router} />)

        const main = document.querySelector('main')
        expect(main).toHaveClass('flex-grow')
        expect(main).toHaveClass('dark:bg-gray-600')
    })
})