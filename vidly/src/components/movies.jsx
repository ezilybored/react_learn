import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { Link } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    // Gets the movie list from fakeMovieServices
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    currentGenre: null,
    // Initial sort when the page is loaded
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies: movies, genres: genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ movies: originalMovies });
    }
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
    this.setState({ currentGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn,
      searchQuery
    } = this.state;
    // Genre filter needs to be applied before the pagination
    // Is only applied if both currentGenre and curremtGenre._id are both truthy
    // Allows the All Genres button to work
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentGenre && currentGenre._id)
      filtered = allMovies.filter(m => m.genre._id === currentGenre._id);

    /*
      ? allMovies.filter(m => m.genre._id === currentGenre._id)
      : allMovies;
      */

    // Sorting comes after filtering but before pagination
    // Sorting is done using lodash. Takes two arguments: the (input) filtered array and an array of properties (the column to filter on)
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // Calls the paginate function from the utils folder paginate.js.
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // Sets the length value from this.state.movies as the variable availableMovies
    const { length: availableMovies } = this.state.movies;
    // Extracts these values from the state using destructuring
    const { pageSize, currentPage, genres, sortColumn } = this.state;

    if (availableMovies === 0)
      return (
        <div className="row">
          <div className="col-2" />
          <div className="col">
            <p className="table-heading-text">
              There are no movies currently in the database
            </p>
          </div>
        </div>
      );

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <nav className="col-md-2 bg-dark sidebar p-3">
          <ListGroup
            items={genres}
            currentItem={this.state.currentGenre}
            onItemChange={this.handleGenreChange}
          />
        </nav>
        <div className="col">
          <p className="table-heading-text">
            Showing {totalCount} movies currently available for rental
          </p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          {/* Redirects to the movie form with an ID of new */}
          <Link to="./movies/new" className="btn btn-primary mb-3">
            Add new movie
          </Link>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
