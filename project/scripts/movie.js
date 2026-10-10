import { movies } from './movies-data.js';

const movieSection = document.querySelector('.movie-main');

function getMovieImage(movie) {
    const image = movie.image;

    if (Array.isArray(image)) {
        return {
            post: image[0]?.post || image[0]?.background || '',
            background: image[0]?.background || image[0]?.post || ''
        };
    }

    if (typeof image === 'string') {
        return { post: image, background: image };
    }

    return { post: '', background: '' };
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

function renderMovie(movie) {
    const image = getMovieImage(movie);
    const actors = Array.isArray(movie.actors) ? movie.actors : [];
    const reviews = Array.isArray(movie.review) ? movie.review : [];
    const stars = movie.rating?.stars ?? 0;

    const actorsHTML = actors.length
        ? actors.map((actor) => `
            <article class="crew">
                <img
                    class="crew-i"
                    src="${escapeHTML(actor.image || '')}"
                    alt="${escapeHTML(actor.name || 'Actor')}"
                    loading="lazy"
                >
                <div class="crew-na">
                    <p class="actor-name">${escapeHTML(actor.name || 'Unknown')}</p>
                    <p class="roll">${escapeHTML(actor.role || '')}</p>
                </div>
            </article>
        `).join('')
        : '<p>Cast information is not available.</p>';

    const reviewsHTML = reviews.length
        ? reviews.map((review) => {
            if (!review || typeof review !== 'object') {
                return `
                    <article class="division-reviews">
                        <p class="info-review">${escapeHTML(review)}</p>
                    </article>
                `;
            }

            const reviewer = review.name || review.user || review.author || 'Viewer';
            const reviewText = review.comment || review.text || review.content || review.review || '';
            const reviewTitle = review.title || 'Viewer review';

            return `
                <article class="division-reviews">
                    <h3 class="header-review">${escapeHTML(reviewTitle)}</h3>
                    <p class="info-review">${escapeHTML(reviewText)}</p>
                    <p class="review-post">${escapeHTML(reviewer)}</p>
                </article>
            `;
        }).join('')
        : '<p>No reviews available for this movie yet.</p>';

    movieSection.innerHTML = `
        <section class="movie-info">
            <div class="info-section">
                <div class="timing-info">
                    <h1>${escapeHTML(movie.name)}</h1>
                    <p>
                        ${escapeHTML(movie.year ?? 'Year unavailable')}
                        · ${escapeHTML(movie.duration ?? movie.runtime ?? 'Runtime unavailable')}
                    </p>
                    <p>${escapeHTML(movie.genre ?? 'Genre unavailable')}</p>
                </div>

                <div class="info-description">
                    <h2>Synopsis</h2>
                    <p>${escapeHTML(movie.description || 'No description available.')}</p>
                </div>

                <div class="info-icons">
                    <p>Rating: ${escapeHTML(stars)} / 5</p>
                    <p>${escapeHTML(movie.rating?.count ?? 0)} ratings</p>
                    <button type="button" id="favorite-button" aria-pressed="false">
                        Add to Favorites
                    </button>
                </div>
            </div>

            <div class="info-image-section">
                <img
                src="${escapeHTML(image.background || image.post)}"
                fetchpriority="high"
                    alt="${escapeHTML(movie.name)} poster"
                >
            </div>
        </section>

        <section class="movie-crew">
            <h2 class="title-crew">Cast</h2>
            <div class="crew-se">${actorsHTML}</div>
        </section>

        <section class="section-reviews">
            <h2>Reviews</h2>
            <div class="reviews">${reviewsHTML}</div>
        </section>
    `;

    setupFavoriteButton(movie.id);
}


function setupFavoriteButton(movieId) {
    const button = document.querySelector('#favorite-button');
    if (!button) return;

    const id = Number(movieId);

    function readFavorites() {
        try {
            const saved = JSON.parse(localStorage.getItem('favorites'));
            return Array.isArray(saved) ? saved.map(Number) : [];
        } catch {
            return [];
        }
    }

    let favorites = readFavorites();

    function updateButton() {
        const isFavorite = favorites.includes(id);

        button.textContent = isFavorite
            ? 'Remove from Favorites'
            : 'Add to Favorites';

        button.setAttribute('aria-pressed', String(isFavorite));
    }

    button.addEventListener('click', () => {
        favorites = favorites.includes(id)
            ? favorites.filter(favoriteId => favoriteId !== id)
            : [...favorites, id];

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateButton();
    });

    updateButton();
}


if (movieSection) {
    const params = new URLSearchParams(window.location.search);
    const movieId = Number(params.get('id'));
    const matchingMovie = movies.find((movie) => movie.id === movieId);

    if (matchingMovie) {
        renderMovie(matchingMovie);
    } else {
        movieSection.innerHTML = `
            <p>Sorry, this movie could not be found.</p>
            <a href="siteplan.html">Return to all movies</a>
        `;
    }
}