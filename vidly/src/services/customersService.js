import http from "./httpService";

const apiEndpoint = "/users";

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCustomers() {
  return http.get(apiEndpoint);
}

// This is going to need a bit more thought to change
export function deleteCustomer(userId) {
  return http.delete(customerUrl(userId));
}
