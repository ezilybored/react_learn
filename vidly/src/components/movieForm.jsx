import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import { getGenres } from "../services/genreService";
import auth from "../services/authService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {}
  };

  // The Joi schema for validation
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres: genres });
  }

  async populateMovies() {
    try {
      // Reads and stores the movie id parameter from the route
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      // If the movie ID is invalid then redirect to /not-found
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  // This function maps the data from the server to fit the model required for the current page
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    // Call the server
    await saveMovie(this.state.data);
    // Redirect user to a different page
    this.props.history.push("/movies");
  };

  render() {
    var title = "Movie info";
    const user = auth.getCurrentUser();
    const movieId = this.props.match.params.id;
    if (movieId === "new") title = "Add new movie";
    return (
      <div className="movieForm">
        <h1 className="login-text">{title}</h1>
        <form className="login-box" onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {user && user.isAdmin && this.renderButton("Save")}
          <Link to="../movies" className="btn btn-primary">
            Back
          </Link>
        </form>
      </div>
    );
  }
}

export default MovieForm;
