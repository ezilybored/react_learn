import React, { Component } from "react";
import http from "./services/httpService";
import { ToastContainer } from "react-toastify";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  // Using axios to get data from jsonplaceholder.com
  // componentDidMount is a method in the class so async goes at the start
  async componentDidMount() {
    // Use await to wait for response. Object destructure the response and save the data as posts
    // The address of the api is stored in confic.json and accessed using config.apiEndpoint
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts: posts });
  }

  // handleAdd is a property applied to a function and so async goes before the arguments ()
  handleAdd = async () => {
    // sending the data o the server
    const obj = { title: "a", body: "b" };
    // axios post takes to arguments. The url and the data to send
    const { data: post } = await http.post(config.apiEndpoint, obj);

    // Adding the data to the table
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "Updated!!";
    //patch updates one property, put updates all properties
    // post takes url (including specific id, and the data to send)
    await http.put(config.apiEndpoint + "/" + post.id, post);

    // update the data to the table
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  /* Add and Update are both examples of pessimistic updates. The server is updated before the UI
  if there are any issues the UI is not updated. Optimistic updates update the UI first and the 
  server second with a failsafe to revert back if the update fails 
  Delete is optimistic updating */

  handleDelete = async post => {
    // Stores the initial state of the app data
    const originalPosts = this.state.posts;

    // filter all posts except the one with the id we have selected
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      // delete takes takes url (including specific id of the post to delete)
      await http.delete("s" + config.apiEndpoint + "/" + post.id);
    } catch (ex) {
      /* ex is an object returned from the server. It has 2 properties, request which tells if the 
      request was made and response which gives the http response code */
      console.log(ex);
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted");
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
