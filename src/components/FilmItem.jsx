import { Link } from "react-router-dom";

const FilmItem = ({
  title,
  release_date,
  id,
  vote_average,
  poster_path,
  isOnWatchlist,
  addToWatchlist,
  removeFromWatchlist,
}) => {
  const d = new Date(release_date);
  const year = d.getFullYear();

  const watchlistButton = isOnWatchlist ? (
    <button
      type="button"
      className="btn btn-sm btn-outline-danger"
      onClick={() => removeFromWatchlist()}
    >
      - Watchlist
    </button>
  ) : (
    <button
      type="button"
      className="btn btn-sm btn-outline-success"
      onClick={() => addToWatchlist()}
    >
      + Watchlist
    </button>
  );
  return (
    <div className="film-item hvr-grow-shadow rounded col-sm-6 col-md-6 col-lg-4 my-3">
      <div className="card box-shadow">
        <Link to={`/filmdetails/${id}`}>
          <img
            className="movie-search-img img-fluid card-img-top"
            src={
              poster_path === null
                ? `https://everyfad.com/static/images/movie_poster_placeholder.29ca1c87.svg`
                : `https://image.tmdb.org/t/p/w342${poster_path}`
            }
            alt={title}
          />
        </Link>
        <div className="card-body py-2">
          <p className="card-title m-0">
            {title} <span>({year})</span>
          </p>
          <p className="card-text film-item-rating">{vote_average} ★</p>
          {watchlistButton}
        </div>
      </div>
    </div>
  );
};

export default FilmItem;

{
  /* <Link to={`/filmdetails/${id}`}>
        <img
          className="movie-search-img img-fluid"
          src={
            poster_path === null
              ? `https://everyfad.com/static/images/movie_poster_placeholder.29ca1c87.svg`
              : `https://image.tmdb.org/t/p/w342${poster_path}`
          }
          alt={title}
        />
      </Link>
      <p>
        {title} <span>({year})</span>
      </p>
      <p className="film-item-rating">{vote_average} ★</p>
      {watchlistButton} */
}
