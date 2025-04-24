import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieDetail from '../MovieDetail';

describe('MovieDetail', () => {
    const mockMovie = {
        adult: false,
        backdrop_path: "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
        belongs_to_collection: {
          id: 1461530,
          name: "The Minecraft Movie Collection",
          poster_path: "/8jMQ2sVZ1RRiYSpcb7Yommo7V4r.jpg",
          backdrop_path: "/48TbIdb60bjLvVhj6W71YNvDM2p.jpg"
        },
        budget: 150000000,
        genres: [
          {
            id: 10751,
            name: "Family"
          },
          {
            id: 35,
            name: "Comedy"
          },
          {
            id: 12,
            name: "Adventure"
          },
          {
            id: 14,
            name: "Fantasy"
          }
        ],
        homepage: "https://www.minecraft-movie.com",
        id: 950387,
        imdb_id: "tt3566834",
        origin_country: [
          "US"
        ],
        original_language: "en",
        original_title: "A Minecraft Movie",
        overview: "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
        popularity: 517.5425,
        poster_path: "/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
        production_companies: [
          {
            id: 174,
            logo_path: "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
            name: "Warner Bros. Pictures",
            origin_country: "US"
          },
          {
            id: 923,
            logo_path: "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
            name: "Legendary Pictures",
            origin_country: "US"
          },
          {
            id: 110691,
            logo_path: "/i0D9b0veZbValgEFiJjSd0mbb9C.png",
            name: "Mojang Studios",
            origin_country: "SE"
          },
          {
            id: 829,
            logo_path: "/aXqwCvJSCDbTclkxAYfsT1l4Dsa.png",
            name: "Vertigo Entertainment",
            origin_country: "US"
          },
          {
            id: 159602,
            logo_path: "/e3KodIPxOSC6xpzgIBISB4COQcu.png",
            name: "On the Roam",
            origin_country: "US"
          },
          {
            id: 216687,
            logo_path: "/kKVYqekveOvLK1IgqdJojLjQvtu.png",
            name: "Domain Entertainment",
            origin_country: "US"
          }
        ],
        production_countries: [
          {
            iso_3166_1: "SE",
            name: "Sweden"
          },
          {
            iso_3166_1: "US",
            name: "United States of America"
          }
        ],
        release_date: "2025-03-31",
        revenue: 717824380,
        runtime: 101,
        spoken_languages: [
          {
            english_name: "English",
            iso_639_1: "en",
            name: "English"
          }
        ],
        status: "Released",
        tagline: "Be there and be square.",
        title: "A Minecraft Movie",
        video: false,
        vote_average: 6.2,
        vote_count: 702
    }

    it('formats release date correctly', () => {
        render(<MovieDetail movie={mockMovie} />);
        expect(screen.getByText('March 31, 2025')).toBeInTheDocument();
    });

    it('displays movie title', () => {
        render(<MovieDetail movie={mockMovie} />);
        expect(screen.getByText('A Minecraft Movie')).toBeInTheDocument();
    });

    it('displays correct status color for released movies', () => {
        render(<MovieDetail movie={mockMovie} />);
        const statusElement = screen.getByText('Released');
        expect(statusElement).toHaveClass('text-emerald-500');
    });

    it('displays correct vote average color for mid-range ratings', () => {
        render(<MovieDetail movie={mockMovie} />);
        const ratingElement = screen.getByText('6.2');
        expect(ratingElement).toHaveClass('text-slate-500');
    });
    it('displays all genre tags', () => {
        render(<MovieDetail movie={mockMovie} />);
        expect(screen.getByText('Family')).toBeInTheDocument();
        expect(screen.getByText('Comedy')).toBeInTheDocument();
        expect(screen.getByText('Adventure')).toBeInTheDocument();
        expect(screen.getByText('Fantasy')).toBeInTheDocument();
    });

    it('formats budget correctly', () => {
        render(<MovieDetail movie={mockMovie} />);
        expect(screen.getByText('$150,000,000.00')).toBeInTheDocument();
    });

    it('formats revenue correctly', () => {
        render(<MovieDetail movie={mockMovie} />);
        expect(screen.getByText('$717,824,380.00')).toBeInTheDocument();
    });

    it('displays runtime with minutes', () => {
        render(<MovieDetail movie={mockMovie} />);
        expect(screen.getByText('101 minutes')).toBeInTheDocument();
    });

    it('displays movie overview', () => {
        render(<MovieDetail movie={mockMovie} />);
        expect(screen.getByText(/Four misfits find themselves/)).toBeInTheDocument();
    });

    it('displays IMDB ID', () => {
        render(<MovieDetail movie={mockMovie} />);
        expect(screen.getByText('tt3566834')).toBeInTheDocument();
    });

    it('displays family-friendly indicator for non-adult movies', () => {
        render(<MovieDetail movie={mockMovie} />);
        const familyImage = screen.getByAltText('not rated movie');
        expect(familyImage).toBeInTheDocument();
    });

    it('displays tagline when available', () => {
        render(<MovieDetail movie={mockMovie} />);
        expect(screen.getByText('Be there and be square.')).toBeInTheDocument();
    });
});