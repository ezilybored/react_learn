import React from "react";
import Like from "./common/like";

const MoviesTable = props => {
  const { movies, onLike, onDelete } = props;
  return (
    <table className="table table-bordered">
      <thead className="thead-light">
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
              <Like liked={movie.liked} onClick={() => onLike(movie)} />
            </td>
            <td>
              {/* An arrow function is used to pass the movie info to the handleDelete function with onClick */}
              <button
                className="btn btn-danger m-2"
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
