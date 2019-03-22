import React from "react";

const MovieForm = props => {
  return (
    // The id of the movie that was clicked on
    // And a button
    <div>
      <h1>Movie ID: {props.match.params.id}</h1>
      <button
        className="btn btn-secondary"
        onClick={() => props.history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
