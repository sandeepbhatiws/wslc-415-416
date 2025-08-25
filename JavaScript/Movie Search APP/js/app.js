const API_KEY = '04c35731a5ee918f014970082a0088b1'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const DEFAULT_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const moviesGrid = document.getElementById('movies');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
        await searchMovies(query);
    }
});

async function searchMovies(query) {
    moviesGrid.innerHTML = '<p style="text-align:center;">Searching...</p>';
    try {
        const res = await fetch(`${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            moviesGrid.innerHTML = '<p style="text-align:center;">No movies found.</p>';
        }
    } catch (error) {
        moviesGrid.innerHTML = '<p style="text-align:center; color: #ff512f;">Error fetching movies. Please try again later.</p>';
    }
}

function displayMovies(movies) {
    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster_path ? IMG_BASE_URL + movie.poster_path : 'images/no-image.png'}" alt="${movie.title}">
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-meta">Release: ${movie.release_date || 'N/A'}</div>
                <div class="vote-average">⭐ ${movie.vote_average || 'N/A'}</div>
            </div>
        </div>
    `).join('');
}

async function defaultMovies() {
    moviesGrid.innerHTML = '<p style="text-align:center;">Searching...</p>';
    try {
        const res = await fetch(`${DEFAULT_BASE_URL}?sort_by=popularity.desc&api_key=${API_KEY}&page=1`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            displayMovies(data.results);
        } else {
            moviesGrid.innerHTML = '<p style="text-align:center;">No movies found.</p>';
        }
    } catch (error) {
        moviesGrid.innerHTML = '<p style="text-align:center; color: #ff512f;">Error fetching movies. Please try again later.</p>';
    }
}

defaultMovies();