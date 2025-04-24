import { describe, test, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';
import { ThemeProvider } from '../../../context/ThemeContext';

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

describe('ThemeToggle', () => {
    test('renders theme toggle button with correct initial icon', () => {
        const { getByRole } = render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );
        
        const button = getByRole('button');
        expect(button).toHaveTextContent('🌙');
    });

    test('toggles theme when clicked', () => {
        const { getByRole } = render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );
        
        const button = getByRole('button');
        fireEvent.click(button);
        expect(button).toHaveTextContent('🌞');
        
        fireEvent.click(button);
        expect(button).toHaveTextContent('🌙');
    });
});