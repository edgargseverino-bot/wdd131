
import { movies } from './movies-data.js';

const favoritePage = document.querySelector('.favorite-movies');

function getFavorites() {
    try {
        const savedFavorites = JSON.parse(
            localStorage.getItem('favorites')
        );

        return Array.isArray(savedFavorites) ? savedFavorites : [];
    } catch {
        return [];
    }
}

function displayFavorites() {
    if (!favoritePage) return;

    const favoriteIds = getFavorites();

    const favoriteMovies = favoriteIds
        .map((id) => movies.find((movie) => movie.id === Number(id)))
        .filter((movie) => movie !== undefined);

    if (favoriteMovies.length === 0) {
        favoritePage.innerHTML = `
            <p class="empty-favorites">
                You haven't added any favorite movies yet.
                <a href="siteplan.html">Explore movies</a>
            </p>
        `;
        return;
    }

    favoritePage.innerHTML = favoriteMovies.map((movie) => {
        const image = movie.image?.[0]?.post || '';
        const stars = movie.rating?.stars ?? 0;

        return `
            <div class="product-container" data-id="${movie.id}">
                <div class="product-image-container">
                    <img
                        class="product-image"
                        src="${image}"
                        alt="${movie.name}"
                        loading="lazy"
                    >
                </div>

                <div class="movie-name-text">
                    ${movie.name}
                </div>

                <div class="product-rating-container">
                    <img
                        class="product-rating-stars"
                        src="images/ratings/rating-${stars * 10}.webp"
                        alt="${stars} stars"
                    >
                </div>

                <button
                    class="remove-favorite-button"
                    type="button"
                    data-remove-id="${movie.id}"
                >
                    Remove from Favorites
                </button>
            </div>
        `;
    }).join('');
}

favoritePage?.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-id]');

    if (removeButton) {
        event.stopPropagation();

        const movieId = Number(removeButton.dataset.removeId);

        const updatedFavorites = getFavorites().filter(
            (id) => Number(id) !== movieId
        );

        localStorage.setItem(
            'favorites',
            JSON.stringify(updatedFavorites)
        );

        displayFavorites();
        return;
    }

    const card = event.target.closest('.product-container');

    if (card) {
        const movieId = Number(card.dataset.id);

        window.location.href = `movie.html?id=${movieId}`;
    }
});

displayFavorites();