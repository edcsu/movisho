import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTitle } from '../useTitle';

describe('useTitle', () => {
    it('should update document title with prefix', () => {
        const testTitle = 'Test Title';
        renderHook(() => useTitle(testTitle));
        
        expect(document.title).toBe(`Movisho: ${testTitle}`);
    });

    it('should update document title when title prop changes', () => {
        const { rerender } = renderHook((title) => useTitle(title), {
            initialProps: 'Initial Title'
        });

        expect(document.title).toBe('Movisho: Initial Title');

        rerender('Updated Title');
        expect(document.title).toBe('Movisho: Updated Title');
    });
});