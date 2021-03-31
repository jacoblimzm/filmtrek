import { Link } from "react-router-dom";
import genres from "../../genres.json";
import SearchBar from "./SearchBar";
import GenreLink from "./GenreLink";

const Nav = ({ handleUserSearch, query }) => {
  const encodedQuery = encodeURI(query);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid ">
        <Link to="/" className="navbar-brand">
          <h1>filmtrek</h1>
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
              <Link to={`/watchlist`} className="nav-link active">
                watchlist
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/popular`} className="nav-link active">
                popular
              </Link>
            </li>
            <li className="nav-item dropdown active">
              <a
                className="nav-link dropdown-toggle"
                href="genres"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                genres
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {genres.genres.map((genre, index) => {
                  return (
                    <li key={index}>
                      <GenreLink {...genre} key={index}/>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="nav-item">
              <Link to={`/about`} className="nav-link active">
                about
              </Link>
            </li>
          </ul>
          <SearchBar handleUserSearch={handleUserSearch} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
