// Substitua com sua própria chave de API do TMDb
const API_KEY = 'e005a466e97a2a74d8c392d5d3bb2c0f';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const moviesContainer = document.getElementById('movies-container');

// Função para buscar os filmes populares
async function getMovies() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    displayMovies(data.results);
}

// Função para exibir os filmes na página
function displayMovies(movies) {
    moviesContainer.innerHTML = ''; // Limpa os filmes anteriores
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

// Chama a função para carregar os filmes
getMovies();

const searchInput = document.getElementById('search');

// Adiciona o evento de escuta para buscas
searchInput.addEventListener('keyup', function() {
    const query = searchInput.value;
    if (query) {
        searchMovies(query);
    } else {
        getMovies(); // Exibe os populares se a busca for vazia
    }
});

// Função para buscar filmes com base em uma query
async function searchMovies(query) {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    displayMovies(data.results);
}



