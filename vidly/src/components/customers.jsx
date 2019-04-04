import React, { Component } from "react";
import { getCustomers, deleteCustomer } from "../services/customersService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import CustomersTable from "./customersTable";
import { toast } from "react-toastify";
import _ from "lodash";

class Customers extends Component {
  state = {
    customers: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    totalCount: 0,
    sortColumn: { path: "email", order: "asc" }
  };

  // Gets the customer data from the database
  async componentDidMount() {
    const { data: customers } = await getCustomers();
    console.log("no sort", customers);
    this.setState({ customers: customers });
  }

  // When changing the page of users
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // Sorts the columns
  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  // Paginates the data
  getPagedData = () => {
    const { pageSize, currentPage, customers, sortColumn } = this.state;
    console.log("start paginate", customers);
    // No need for filtering etc here. Straight to paginate

    // Sorting is done by lodash
    const sorted = _.orderBy(customers, [sortColumn.path], [sortColumn.order]);
    console.log("sorted", sorted);
    // Calls the paginate function from the utils folder paginate.js.
    const pagedCustomers = paginate(sorted, currentPage, pageSize);
    console.log("paginated", pagedCustomers);
    return { totalCount: customers.length, data: pagedCustomers };
  };

  // For searching through the users names
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  // For deleting a user
  handleDelete = async user => {
    const originalUsers = this.state.customers;

    const users = originalUsers.filter(m => m._id !== user._id);
    this.setState({ customers: users });

    try {
      await deleteCustomer(user._id);
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 404)
        toast.error("This user has already been deleted");
      this.setState({ customers: originalUsers });
    }
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data } = this.getPagedData();

    return (
      <div>
        <CustomersTable
          users={data}
          sortColumn={sortColumn}
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
    );
  }
}

export default Customers;
