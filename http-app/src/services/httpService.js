import axios from "axios";

/* This is used for intercepting errors using axios. The first parameter is a success function, 
the second is an error fu Notification. Here the success function is set to  null */
axios.interceptors.response.use(null, error => {
  // If the error is between 400 and 500 then it is expected
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  // If the error is no expected
  if (!expectedError) {
    // Retrurn the generic error message
    console.log("Logging the error", error);
    alert("An unexpected error occured");
  }
  // Otherwise it is an expected error so send the message to the expected error code in handleDelete()
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
