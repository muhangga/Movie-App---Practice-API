// const APIKEY = "251591276aa0bcfac7c8fcf42884a318";
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=251591276aa0bcfac7c8fcf42884a318&page=1";
const ImagePath = "https://image.tmdb.org/t/p/w1280";
const searchAPI = "https://api.themoviedb.org/3/search/movie?&api_key=251591276aa0bcfac7c8fcf42884a318&query=";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// favorit film
getMovies(APIURL);


async function getMovies(url) {
   const res = await fetch(url);
   const resData = await res.json();

   showMovies(resData);
 }

 function showMovies(movies) {
    //hapus main
    main.innerHTML = "";

    movies.results.forEach(movie => {
       const movieElement = document.createElement('div');
       const {
          poster_path,
          title,
          vote_average,
          overview,
          realease_date
       } = movie;
       movieElement.classList.add('movie');

       movieElement.innerHTML = `
            <img src="${ImagePath + poster_path}" alt="${title}">
               <div class="movie-info">
                  <h3>${title}</h3>
                  <span class="${getClassRate(vote_average)}">${vote_average}</span>
               </div>
               <div class="overview">
               <h4> Overview </h4>
                  ${overview}
               </div>
         `
       main.appendChild(movieElement);
    });
 }

function getClassRate(vote) {
   if (vote >= 8) {
      return "green";
   } else if (vote >= 5) {
      return "orange"
   } else {
      return "red";
   }
}

form.addEventListener('submit', (e) => {
   e.preventDefault();

   const searchMovie = search.value;

   if (searchMovie) {
      getMovies(searchAPI + searchMovie);

      search.value = "";
   }
});

