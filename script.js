const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=027792909d73cf14966305d916cda88c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=027792909d73cf14966305d916cda88c&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

//Get initial movies, fetching the raw data into a variable

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)

}

// where the real magic happens. getting the data to the dom

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {

        //instead of movie.title, movie.poster_path etc
        //using structuring (of variables), for the object "movie" contains movie's data

        const {title, poster_path, vote_average, overview  } = movie

        //making movieElement a div which we will append to the dom.

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = 
    `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>
    `   
    //appending movieEl to the DOM

        main.appendChild(movieEl)

    });
}


function getClassByRate(vote) {
    if(vote >= 8)
    {
        return 'green'
    } 
    else if (vote>=5) {
        return 'orange'
    }
    else {
        return 'red'
    }
}

//preventdefault - because the listener type is submit

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value 

    //if input, concate it with the search_api

    if(searchTerm) {
        getMovies(SEARCH_API + searchTerm)

    //After search, clearing value

        search.value = '';
    } else {
        window.location.reload()
    }
})

