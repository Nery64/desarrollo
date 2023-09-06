const genreSelect = document.getElementById('genre-select');
const moviesList = document.getElementById('movies-list');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const englishButton = document.getElementById('english-button');
const spanishButton = document.getElementById('spanish-button');

const apiKey = 'bb7abbcea0251e406b9e2d37d08924a1'; 
let language = 'es'; // Por defecto comienza en Español

let currentPage = 1;
const pelisXpag = 10;

//Funcion Lenguaje
function setLanguage(lang) {
    language = lang;
    fetchGenres();
    fetchMoviesByGenreAndPage('', currentPage);
}

//Funcion FETCH para obtener listado segun el genero
function fetchMoviesByGenreAndPage(genreId, page) {
    const offset = (page - 1) * pelisXpag;
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&with_genres=${genreId}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            moviesList.innerHTML = ''; // Clear previous movies
            data.results.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const poster = document.createElement('img');
                poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                poster.alt = movie.title;

                const title = document.createElement('div');
                title.classList.add('movie-title');
                title.textContent = movie.title;

                const description = document.createElement('div');
                description.classList.add('movie-description');
                description.textContent = movie.overview;

                movieDiv.appendChild(poster);
                movieDiv.appendChild(title);
                movieDiv.appendChild(description);

                moviesList.appendChild(movieDiv);
            });

            // Enable or disable pagination buttons based on the current page
            prevButton.disabled = page === 1;
            nextButton.disabled = page >= data.total_pages;
        })
        .catch(error => console.error(error));
}

//Funcion obtener lista de Generos
function fetchGenres() {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${language}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            genreSelect.innerHTML = ''; // Clear previous options
            data.genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        })
        .catch(error => console.error(error));
}

englishButton.addEventListener('click', () => {
    setLanguage('en');
});

spanishButton.addEventListener('click', () => {
    setLanguage('es');
});

genreSelect.addEventListener('change', () => {
    const selectedGenreId = genreSelect.value;
    currentPage = 1; // Reset to the first page when changing genres
    fetchMoviesByGenreAndPage(selectedGenreId, currentPage);
});

nextButton.addEventListener('click', () => {
    currentPage++;
    const selectedGenreId = genreSelect.value;
    fetchMoviesByGenreAndPage(selectedGenreId, currentPage);
});

prevButton.addEventListener('click', () => {
    currentPage--;
    const selectedGenreId = genreSelect.value;
    fetchMoviesByGenreAndPage(selectedGenreId, currentPage);
});

// Cargar los generos y Peliculas al abrir la pagina
fetchGenres();
fetchMoviesByGenreAndPage('', currentPage);
