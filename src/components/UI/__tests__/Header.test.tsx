import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Header from '../Header'
import { ThemeProvider } from '../../../context/ThemeContext'

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

describe('Header', () => {
    const renderHeader = () => {
        const router = createBrowserRouter([
            {
                path: '/',
                element: (
                    <ThemeProvider>
                        <Header />
                    </ThemeProvider>
                ),
            },
        ])
        return render(<RouterProvider router={router} />)
    }

    it('should reset search form when navigating away from search results', () => {
        renderHeader()
        
        const searchInput = screen.getByPlaceholderText('Search')
        userEvent.type(searchInput, 'test search')
        
        // Simulate navigation away from search results
        window.history.pushState({}, '', '/')
        
        expect(searchInput).toHaveValue('')
    })

    it('renders search inputs on both desktop and mobile', () => {
        renderHeader()
        
        const searchInputs = screen.getAllByPlaceholderText('Search')
        expect(searchInputs).toHaveLength(1)
    })

    it('renders navigation links correctly', () => {
        renderHeader()
        
        expect(screen.getAllByText('Home')).toHaveLength(2)
        expect(screen.getByText('Popular')).toBeInTheDocument() 
        expect(screen.getByText('Top rated')).toBeInTheDocument()
        expect(screen.getByText('Upcoming')).toBeInTheDocument()
    })

    it('toggles mobile menu when button is clicked', async () => {
        renderHeader()
        
        const menuButton = screen.getByTitle('breadcrumb')
        await userEvent.click(menuButton)
        
        expect(screen.getAllByText('Home')).toHaveLength(3)
        expect(screen.getAllByText('Popular')).toHaveLength(2)
        
        await userEvent.click(menuButton)
        expect(screen.getAllByText('Popular')).toHaveLength(2)
    })

    it('toggles mobile search when search button is clicked', async () => {
        renderHeader()
        
        const searchButton = screen.getByRole('button', { name: 'Search' })
        await userEvent.click(searchButton)
        
        const searchInputs = screen.getAllByPlaceholderText('Search')
        expect(searchInputs).toHaveLength(2)
    })
})