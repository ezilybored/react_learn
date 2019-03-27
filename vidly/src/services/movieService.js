//import * as genresAPI from "./fakeGenreService";
import http from "./httpService";

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}

/*
export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}

*/

export function deleteMovie(movieId) {
  return http.delete("http://localhost:3900/api/movies" + "/" + movieId);
  /*
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
  */
}
