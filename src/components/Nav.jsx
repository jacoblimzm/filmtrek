import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Nav = ( {handleUserSearch, query} ) => {

  const encodedQuery = encodeURI(query)
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid ">
        <Link to="/" className="navbar-brand">
          filmtrek
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarToggler"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 mx-4">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/results/${encodedQuery}`} className="nav-link active">
                results
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/filmdetails/:filmid" className="nav-link active" tabIndex="-1">
                film
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/albumdetails/:albumid" className="nav-link active" tabIndex="-1">
                album
              </Link>
            </li>
          </ul>
          <SearchBar handleUserSearch={handleUserSearch} />
          {/* <form className="d-flex">
            <input
              className="form-control me-2 mx-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Find
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
