import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import ListGroup from "./common/listgroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    // Gets the movie list from fakeMovieServices
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: []
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(c => c._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });

    // Also need to set the values in the server. This does not so far
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    // Also set the current page to 1 when genre is changed
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  render() {
    // Sets the length value from this.state.movies as the variable availableMovies
    const { length: availableMovies } = this.state.movies;
    // Extracts these values from the state using destructuring
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      currentGenre
    } = this.state;

    if (availableMovies === 0)
      return (
        <div className="row">
          <div className="col-2" />
          <div className="col">
            <h2>BlankBuster Movies</h2>
            <p>There are no movies currently in the database</p>
          </div>
        </div>
      );

    // Genre filter needs to be applied before the pagination
    // Is only applied if both currentGenre and curremtGenre._id are both truthy
    // Allows the All Genres button to work
    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter(m => m.genre._id === currentGenre._id)
        : allMovies;
    // Calls the paginate function from the utils folder paginate.js
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            currentItem={this.state.currentGenre}
            onItemChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <h2>BlankBuster Movies</h2>
          <p>Showing {filtered.length} movies currently available for rental</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {/* Applies the map method to the movies array returned from the paginate function */}
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    {/* An arrow function is used to pass the movie info to the handleDelete function with onClick */}
                    <button
                      className="btn btn-danger btn-sm m-2"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
