import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from '../useDarkMode';
import * as darkModeUtils from '../../utils/darkMode';

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

vi.mock('../../utils/darkMode', () => ({
    getSystemTheme: vi.fn(),
    getStoredTheme: vi.fn(),
    setStoredTheme: vi.fn(),
    applyTheme: vi.fn()
}));

describe('useDarkMode', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should initialize with system theme when no stored theme', () => {
        vi.mocked(darkModeUtils.getStoredTheme).mockReturnValue(null);
        vi.mocked(darkModeUtils.getSystemTheme).mockReturnValue('dark');

        const { result } = renderHook(() => useDarkMode());
        expect(result.current[0]).toBe(true);
    });

    it('should initialize with stored theme when available', () => {
        vi.mocked(darkModeUtils.getStoredTheme).mockReturnValue('light');

        const { result } = renderHook(() => useDarkMode());
        expect(result.current[0]).toBe(false);
    });

    it('should toggle theme when calling toggleDarkMode', () => {
        vi.mocked(darkModeUtils.getStoredTheme).mockReturnValue('light');

        const { result } = renderHook(() => useDarkMode());
        act(() => {
            result.current[1]();
        });

        expect(result.current[0]).toBe(true);
        expect(darkModeUtils.applyTheme).toHaveBeenCalledWith('dark');
        expect(darkModeUtils.setStoredTheme).toHaveBeenCalledWith('dark');
    });

    it('should respond to system theme changes when no manual override', () => {
        vi.mocked(darkModeUtils.getStoredTheme).mockReturnValue(null);
        vi.mocked(darkModeUtils.getSystemTheme).mockReturnValue('light');

        const mockMediaQueryList = {
            addEventListener: vi.fn(),
            removeEventListener: vi.fn()
        };

        global.window.matchMedia = vi.fn().mockReturnValue(mockMediaQueryList);

        renderHook(() => useDarkMode());

        expect(mockMediaQueryList.addEventListener).toHaveBeenCalledWith(
            'change',
            expect.any(Function)
        );
    });
});