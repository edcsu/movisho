import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'
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

describe('Footer', () => {
    it('renders footer content', () => {
        render(
            <ThemeProvider>
                <Footer />
            </ThemeProvider>
        )

        // Test logo and title
        expect(screen.getByAltText('logo')).toBeInTheDocument()
        expect(screen.getByText('Movisho')).toBeInTheDocument()

        // Test copyright text
        expect(screen.getByText(/Copyright © \d{4}\. All rights reserved\./)).toBeInTheDocument()

        // Test social links
        expect(screen.getByText('linkedin')).toBeInTheDocument()
        expect(screen.getByText('GitHub')).toBeInTheDocument() 
        expect(screen.getByText('x')).toBeInTheDocument()

        // Test external links
        const [linkedin, github, twitter] = screen.getAllByRole('link')
        expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/ssewannonda-keith-edwin-443303129')
        expect(github).toHaveAttribute('href', 'https://github.com/edcsu')
        expect(twitter).toHaveAttribute('href', 'https://x.com/skeith696')
    })
})