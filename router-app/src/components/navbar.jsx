import React from "react";
import { Link } from "react-router-dom";
// Use Link from react-router-dom to replace <a> tag. Then replace href with to
// This stops the browser sending a Get request every time the page is changed
// The Link holds a function that updates the URL, this then causes the app to load the new page
// The pages are all pre-downloaded to the browser when the app is first navigated to

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/posts/2018/06">Posts</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  );
};

export default NavBar;
