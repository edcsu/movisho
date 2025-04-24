import { describe, it, expect, vi } from 'vitest';
import { render, renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { useDarkMode } from '../hooks/useDarkMode';

vi.mock('../hooks/useDarkMode', () => ({
    useDarkMode: vi.fn()
}));

describe('ThemeContext', () => {
    it('should provide theme context values to children', () => {
        const mockToggle = vi.fn();
        vi.mocked(useDarkMode).mockReturnValue([true, mockToggle]);

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
        });

        expect(result.current.isDark).toBe(true);
        expect(typeof result.current.toggleDarkMode).toBe('function');
    });

    it('should throw error when useTheme is used outside provider', () => {
        expect(() => {
            renderHook(() => useTheme());
        }).toThrow('useTheme must be used within a ThemeProvider');
    });

    it('should pass dark mode state to children', () => {
        vi.mocked(useDarkMode).mockReturnValue([true, vi.fn()]);
        
        const TestChild = () => {
            const { isDark } = useTheme();
            return <div data-testid="test-child">{isDark ? 'dark' : 'light'}</div>;
        };

        const { getByTestId } = render(
            <ThemeProvider>
                <TestChild />
            </ThemeProvider>
        );

        expect(getByTestId('test-child').textContent).toBe('dark');
    });
});