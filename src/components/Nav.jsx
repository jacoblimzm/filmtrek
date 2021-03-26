import { Link } from "react-router-dom";

const Nav = () => {
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
              <Link to="/results" className="nav-link active">
                results
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/details" className="nav-link active" tabIndex="-1">
                details
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2 mx-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Find
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
