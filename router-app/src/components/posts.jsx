import React from "react";
import queryString from "query-string";

const Posts = props => {
  // Returns an object with the browser navbar query string parameters
  // test query string is ?sortBy=newest&approved=true
  const result = queryString.parse(props.location.search);
  console.log(result);
  return (
    <div>
      <h1>Posts</h1>
      Year: {props.match.params.year}, Month: {props.match.params.month}
    </div>
  );
};

export default Posts;
