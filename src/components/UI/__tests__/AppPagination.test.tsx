import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import AppPagination from '../AppPagination';

describe('AppPagination', () => {
    const mockOnPageChange = vi.fn();
    
    const defaultProps = {
        page: 1,
        total_pages: 10,
        maxVisiblePages: 5,
        onPageChange: mockOnPageChange
    };

    it('renders pagination with correct number of pages', () => {
        const { container } = render(<AppPagination pagination={defaultProps} />);
        const buttons = container.querySelectorAll('button');
        // 7 buttons = Previous + 5 page numbers + Next
        expect(buttons.length).toBe(7);
    });

    it('disables Previous button on first page', () => {
        const { getByText } = render(<AppPagination pagination={defaultProps} />);
        const prevButton = getByText('Previous');
        expect(prevButton).toBeDisabled();
    });

    it('disables Next button on last page', () => {
        const props = { ...defaultProps, page: 10 };
        const { getByText } = render(<AppPagination pagination={props} />);
        const nextButton = getByText('Next');
        expect(nextButton).toBeDisabled();
    });

    it('calls onPageChange when clicking page numbers', () => {
        const { getByText } = render(<AppPagination pagination={defaultProps} />);
        fireEvent.click(getByText('2'));
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('shows ellipsis when there are many pages', () => {
        const props = { ...defaultProps, total_pages: 20 };
        const { getAllByText } = render(<AppPagination pagination={props} />);
        const ellipsis = getAllByText('...');
        expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('handles Next button click', () => {
        const { getByText } = render(<AppPagination pagination={defaultProps} />);
        fireEvent.click(getByText('Next'));
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('handles Previous button click when not on first page', () => {
        const props = { ...defaultProps, page: 2 };
        const { getByText } = render(<AppPagination pagination={props} />);
        fireEvent.click(getByText('Previous'));
        expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });
});