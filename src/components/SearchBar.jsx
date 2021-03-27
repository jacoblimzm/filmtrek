import { useState } from "react";
import { Link } from "react-router-dom";


const SearchBar = ( {handleUserSearch} ) => {

    // const quotes = []


    const [inputSearch, setInputSearch] = useState("");

    const handleSearchChange = (e) => {
        setInputSearch(e.target.value);
      };

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const encodedSearch = encodeURI(e.target.search.value);
    //     handleUserSearch(encodedSearch);
    //   };
    

  return (
    <form className="d-flex">
      <input
        className="form-control"
        name="search"
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
