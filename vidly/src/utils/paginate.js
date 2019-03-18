import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  // Calculate the starting index of the page
  const startIndex = (pageNumber - 1) * pageSize;
  // Creates a new array of items using slice to cut from the startIndex to the pageSize and return and array
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();

  // Worth noting that this only works with static local data and will not work with data from a server
}
