
import { movies } from './movies-data.js';

const header = document.querySelector('.movie-header');
const movieGrid = document.querySelector('.js-movies-grid');

let currentFilter = 'all';
let searchText = '';
let searchTimer;

// Cache lowercase names once instead of converting them on every search.
const normalizedMovieNames = new Map(
    movies.map((movie) => [
        movie.id,
        String(movie.name ?? '').toLowerCase()
    ])
);

function getMovieImage(movie) {
    const image = movie.image;

    if (Array.isArray(image)) {
        return image[0]?.post || image[0]?.background || '';
    }

    return typeof image === 'string' ? image : '';
}

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

function renderHeader() {
    if (!header) return;

    header.innerHTML = `
        <a class="movie-header-left-section" href="siteplan.html">
        <img src="images/logo.svg" alt="movie-explore-logo">
            <span class="movie-logo">OVIE EXPLORER</span>
        </a>

        <nav class="movie-header-middle-section">
            <button type="button" id="all">All Movies</button>
            <button type="button" id="new">New</button>
            <button type="button" id="popular">Popular</button>
        </nav>

        <div class="movie-header-right-section">
            <input
                type="search"
                id="search"
                placeholder="Search movies..."
                aria-label="Search movies"
            >
            <a href="checklist.html">Favorites</a>
        </div>
    `;
}

function renderMovies(movieList) {
    if (!movieGrid) return;

    if (movieList.length === 0) {
        movieGrid.innerHTML = `
            <p class="no-movies">
                No movies found. Try another search.
            </p>
        `;
        return;
    }

    movieGrid.innerHTML = movieList.map((movie) => {
        const image = getMovieImage(movie);
        const stars = movie.rating?.stars ?? 0;

        return `
            <article class="product-container" data-id="${Number(movie.id)}">
                <div class="product-image-container">
                    <img
                        class="product-image"
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(movie.name)}"
                        loading="lazy"
                    >
                </div>

                <div class="movie-name-text">
                    ${escapeHTML(movie.name)}
                </div>

                <div class="product-rating-container">
                    <img
                        class="product-rating-stars"
                        src="images/ratings/rating-${Number(stars) * 10}.webp"
                        alt="${escapeHTML(stars)} stars"
                        loading="lazy"
                    >
                    <span>${escapeHTML(movie.rating?.count ?? 0)} ratings</span>
                </div>
            </article>
        `;
    }).join('');
}

function getFilteredMovies() {
    let filteredMovies = movies;

    if (currentFilter === 'new') {
        filteredMovies = movies.filter(
            (movie) => Number(movie.year) >= 2020
        );
    } else if (currentFilter === 'popular') {
        // Sort a copy so the original movies array stays unchanged.
        filteredMovies = [...movies].sort(
            (a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0)
        );
    }

    if (searchText) {
        filteredMovies = filteredMovies.filter((movie) =>
            normalizedMovieNames.get(movie.id)?.includes(searchText)
        );
    }

    return filteredMovies;
}

function updateMovies() {
    renderMovies(getFilteredMovies());
}

renderHeader();

// One listener handles all three navigation buttons.
const nav = document.querySelector('.movie-header-middle-section');

nav?.addEventListener('click', (event) => {
    const button = event.target.closest('button');

    if (!button) return;

    if (button.id === 'all') {
        currentFilter = 'all';
    } else if (button.id === 'new') {
        currentFilter = 'new';
    } else if (button.id === 'popular') {
        currentFilter = 'popular';
    } else {
        return;
    }

    updateMovies();
});

// Debounce search so rapid typing doesn't trigger a render per keystroke.
const headerSearch = document.querySelector('#search');

headerSearch?.addEventListener('input', (event) => {
    searchText = event.target.value.trim().toLowerCase();

    clearTimeout(searchTimer);

    searchTimer = setTimeout(() => {
        updateMovies();
    }, 150);
});

// One listener handles clicks on all movie cards.
movieGrid?.addEventListener('click', (event) => {
    const card = event.target.closest('.product-container');

    if (!card || !movieGrid.contains(card)) return;

    window.location.href = `movie.html?id=${card.dataset.id}`;
});

// Render the initial catalog.
updateMovies();

// Footer dates.
const yearElement = document.querySelector('#currentyear');
const modifiedElement = document.querySelector('#lastModified');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
}
