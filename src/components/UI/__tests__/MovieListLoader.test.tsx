import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import MovieListLoader from '../MovieListLoader';

describe('MovieListLoader', () => {
    test('renders the loader component', () => {
        render(<MovieListLoader />);
        const loaderElements = document.querySelectorAll('.w-full');
        expect(loaderElements.length).toBe(16); // 16 loader items
    });

    test('renders placeholder elements for each movie', () => {
        render(<MovieListLoader />);
        const imageElements = document.querySelectorAll('.h-64');
        const titleElements = document.querySelectorAll('.w-56');
        const subtitleElements = document.querySelectorAll('.w-24');

        expect(imageElements.length).toBe(8);
        expect(titleElements.length).toBe(8);
        expect(subtitleElements.length).toBe(8);
    });

    test('has correct animation classes', () => {
        render(<MovieListLoader />);
        const container = document.querySelector('.animate-pulse');
        expect(container).toBeTruthy();
    });

    test('has dark mode support', () => {
        render(<MovieListLoader />);
        const wrapper = document.querySelector('.dark\\:bg-gray-500');
        const placeholders = document.querySelectorAll('.dark\\:bg-gray-600');
        const textPlaceholders = document.querySelectorAll('.dark\\:bg-gray-700');
        
        expect(wrapper).toBeTruthy();
        expect(placeholders.length).toBe(8);
        expect(textPlaceholders.length).toBe(16); // 8 titles + 8 subtitles
    });
});