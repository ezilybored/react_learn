import React, { Component } from "react";
import "./App.css";
import { getMovies } from "./services/fakeMovieService";
import Movies2 from "./components/movies2";

class App extends Component {
  state = {
    // Gets the movie list from fakeMovieServices
    movies: getMovies()
  };

  handleDelete = movie => {
    console.log(movie);
    const movies = this.state.movies.filter(c => c._id !== movie._id);
    this.setState({ movies: movies });
  };

  render() {
    return (
      <main className="container">
        <Movies2
          key={this.state.movies._id}
          movies={this.state.movies}
          onDelete={this.handleDelete}
        />
      </main>
    );
  }
}

export default App;
