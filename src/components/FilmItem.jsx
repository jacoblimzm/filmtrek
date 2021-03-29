import { Link } from "react-router-dom";

const FilmItem = ({ poster_path, id, title}) => {
  return (
    <div className="film-item col-md-6 col-lg-4 pb-5">
      <Link to={`/filmdetails/${id}`}>
        <img
          className="movie-search-img img-fluid"
          src={`https://image.tmdb.org/t/p/w342${poster_path}`}
          alt={title}
        />
      </Link>
    </div>
  );
};

export default FilmItem;
