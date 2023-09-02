document.addEventListener('DOMContentLoaded', function() {
    const genreSelect = document.getElementById('genreSelect');
    const moviesContainer = document.getElementById('movies');
    const toggleEnglishButton = document.getElementById('toggleEnglish');

    const apiKey = '9682938fd3c81180eac3db9f86119479'; // Reemplaza con tu propia clave de API TMDb

    // Función para cambiar el idioma de la página
    toggleEnglishButton.addEventListener('click', function() {
        const currentLang = document.documentElement.lang;
        document.documentElement.lang = currentLang === 'es' ? 'en' : 'es';

        // Actualiza el texto del botón de cambio de idioma
        toggleEnglishButton.textContent = currentLang === 'es' ? 'English' : 'Español';

        // Recarga las películas con el nuevo idioma si es necesario
        // Aquí puedes agregar código para recargar las películas según el idioma
    });

    // Función para obtener los géneros de películas desde la API de TMDb
    function fetchGenres() {
        const lang = document.documentElement.lang;
        const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?language=${lang}&api_key=${apiKey}`;

        fetch(genreUrl)
            .then(response => response.json())
            .then(data => {
                const genres = data.genres;
                genres.forEach(genre => {
                    const option = document.createElement('option');
                    option.value = genre.id;
                    option.textContent = genre.name;
                    genreSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error al obtener los géneros:', error));
    }

    // Llama a la función para cargar los géneros cuando se carga la página
    fetchGenres();
});
