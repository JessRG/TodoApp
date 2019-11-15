// Set up filters default object
const filters = {
  searchText: "",
  hideCompleted: false
};

// getFilters
// Arguments: none
// Return value: filters object
const getFilters = () => filters;

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none
const setFilters = ({ searchText, hideCompleted }) => {
  const st = typeof searchText === "string";
  const hc = typeof hideCompleted === "boolean";

  if (st && hc) {
    filters.searchText = searchText;
    filters.hideCompleted = hideCompleted;
  } else if (st) {
    filters.searchText = searchText;
  } else if (hc) {
    filters.hideCompleted = hideCompleted;
  } else {
    console.log("filter property not set to valid datatype");
  }
};

// Make sure to set up the exports
export { getFilters, setFilters };
