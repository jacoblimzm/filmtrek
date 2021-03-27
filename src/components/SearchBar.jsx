import { useState } from "react";
import { Link } from "react-router-dom";


const SearchBar = ( {handleUserSearch} ) => {

    // const quotes = []


    const [inputSearch, setInputSearch] = useState("");

    const handleSearchChange = (e) => {
        setInputSearch(e.target.value);
      };

      const handleSubmit = (e) => {
        const userSearch = e.target.searchInput.value;
        // console.log(encodedSearch)
        handleUserSearch(userSearch);
        e.preventDefault();
      };
    

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        className="form-control"
        name="searchInput"
        value={inputSearch}
        onChange={handleSearchChange}
        type="search"
        placeholder="hello there!"
        aria-label="Search"
      />
      <Link className="btn btn-outline-light ms-2" to={`/results/${inputSearch}`}>
        Find
      </Link>
      {/* <button className="btn btn-outline-light" type="submit">
            Find
          </button> */}
    </form>
  );
};

export default SearchBar;
